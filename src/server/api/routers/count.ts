import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const countRouter = createTRPCRouter({
    getLinkVisitedCount: publicProcedure
        .input(
            z.object({
                url: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const count = await ctx.db.userShortenedLink.findUnique({
                where: {
                    url: input.url,
                },
            });
            return count?.count ?? 0;
        }),
    updateLinkVisitedCount: publicProcedure
        .input(
            z.object({
                url: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.userShortenedLink.update({
                where: {
                    url: input.url,
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
