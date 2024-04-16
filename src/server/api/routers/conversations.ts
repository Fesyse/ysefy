import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const conversationsRouter = createTRPCRouter({
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
