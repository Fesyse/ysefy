import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const conversationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ usersIds: z.array(z.string().cuid()) }))
    .mutation(async ({ ctx, input: { usersIds } }) => {
      return await ctx.db.conversation.create({
        data: {
          usersIds,
        },
      })
    }),
})
