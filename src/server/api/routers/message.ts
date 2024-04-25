import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { pusherServer } from "@/server/pusher-server"

export const messageRouter = createTRPCRouter({
  getSome: protectedProcedure
    .input(z.object({ conversationId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.message.findMany({
        include: { user: true },
        where: {
          conversationId: input.conversationId,
        },
        take: 40,
        orderBy: {
          createdAt: "asc",
        },
      })
    }),
  create: protectedProcedure
    .input(z.object({ conversationId: z.string().cuid(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.message.create({
        data: {
          content: input.content,
          conversationId: input.conversationId,
          userId: ctx.session.user.id,
        },
        include: { user: true },
      })
      await pusherServer.trigger(input.conversationId, "new-message", message)
      return message
    }),
})
