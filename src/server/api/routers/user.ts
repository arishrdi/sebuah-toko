import { hash } from "argon2";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: await hash(input.password),
          },
        });
      } catch (err) {
        console.log("registerSchema => ", err);
      }
    }),
});
