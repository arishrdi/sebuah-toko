import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  postCarts: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.cart.createMany({
          data: {
            productId: input.productId,
            quantity: input.quantity,
          },
        });
      } catch (err) {
        console.log("registerSchema => ", err);
      }
    }),
});
