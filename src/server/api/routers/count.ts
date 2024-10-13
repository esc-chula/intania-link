import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const countRouter = createTRPCRouter({
    getLinkVisitedCount: publicProcedure
        .input(
            z.object({
                link: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const count = await ctx.db.counter.findUnique({
                where: {
                    link: input.link,
                },
            });
            return count?.count ?? 0;
        }),
    createLinkVisitedCount: publicProcedure
        .input(
            z.object({
                link: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.counter.create({
                data: {
                    link: input.link,
                    count: 1,
                },
            });
            return {
                message: "Link count created",
            };
        }),
    updateLinkVisitedCount: publicProcedure
        .input(
            z.object({
                link: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.counter.update({
                where: {
                    link: input.link,
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            });
            return {
                message: "Link visited count updated",
            };
        }),
});
