import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const conversationsRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.conversation.findUnique({
        where: {
          id: input.id,
        },
        include: {
          _count: true,
        },
      })
    }),
  isHaveAccessToConversation: protectedProcedure
    .input(z.object({ conversationId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const conversation = await ctx.db.conversation.findUnique({
        where: {
          users: {
            some: {
              id: ctx.session.user.id,
            },
          },

          id: input.conversationId,
        },
        include: { _count: true, users: true },
      })
      return !conversation ? null : conversation
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.conversation.findMany({
      where: {
        users: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
    })
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        usersIds: z.array(z.string()),
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input: { name, usersIds, imageUrl } }) => {
      const newConversation = await ctx.db.conversation.create({
        data: {
          name,
          imageUrl,
          ownerId: ctx.session.user.id,
        },
      })

      await ctx.db.$transaction(
        usersIds.map(id =>
          ctx.db.user.update({
            where: { id },
            data: {
              conversations: {
                connect: {
                  id: newConversation.id,
                },
              },
            },
          }),
        ),
      )

      return newConversation
    }),
})
