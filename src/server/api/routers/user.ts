import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const formUpdateUserSchema = z.object({
  name: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" }),
      z
        .string()
        .max(12, { message: "Username must be at most 12 characters long" }),
    ])
    .optional()
    .transform(e => (e === "" ? undefined : e)),
  email: z
    .union([
      z.string().length(0),
      z.string().email({ message: "Email must be valid" }),
    ])
    .optional()
    .transform(e => (e === "" ? undefined : e)),
  id: z.string().cuid(),
})

export const userRouter = createTRPCRouter({
  update: protectedProcedure.input(formUpdateUserSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.db.user.update({
        where: { id: input.id },
        data: input,
      }),
  ),
  findManyBySubstring: protectedProcedure
    .input(z.object({ substring: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          name: {
            contains: input.substring,
          },
        },
      })
      return users.filter(user => user.id !== ctx.session.user.id)
    }),
})
