import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { formUpdateUserSchema } from "@/app/_components/ui/layout/side-bar/profile/profile-form"
import { z } from "zod"

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      formUpdateUserSchema.extend({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.id },
        data: input,
      })
    }),
})
