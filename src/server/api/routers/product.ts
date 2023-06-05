import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  postProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().nullable(),
        userId: z.string(),
        sku: z.string().nullable(),
        price: z.number(),
        unit: z.string(),
        category: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, image, userId, sku, price, unit, category } = input;
      try {
        await ctx.prisma.product.create({
          data: {
            name,
            image,
            userId,
            sku,
            price,
            unit,
            category,
          },
        });
      } catch (err) {
        console.log("createProduct => ", err);
      }
    }),
  getAllProduct: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.product.findMany({
          select: {
            id: true,
            name: true,
            image: true,
            sku: true,
            price: true,
            unit: true,
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          where: {
            userId: input.userId,
          },
        });
      } catch (err) {
        console.log("getAllProduct", err);
      }
    }),
});
