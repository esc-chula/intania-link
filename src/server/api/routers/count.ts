import { z } from 'zod';

import { createTRPCRouter, trpc } from '../trpc';

export const countRouter = createTRPCRouter({
  getLinkVisitedCount: trpc
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.db.userShortenedLink.findUnique({
        where: {
          slug: input.slug,
        },
      });
      return count?.count ?? 0;
    }),
  updateLinkVisitedCount: trpc
    .input(
      z.object({
        slug: z.string(),
        searchParams: z.object({
          utm_source: z.string().optional(),
          utm_medium: z.string().optional(),
          utm_campaign: z.string().optional(),
          utm_id: z.string().optional(),
          utm_term: z.string().optional(),
          utm_content: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.userShortenedLink.updateMany({
        where: {
          slug: input.slug,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
      if (Object.keys(input.searchParams).length) {
        await ctx.db.userShortenedLinkVisitedRecord.create({
          data: {
            userShortenedLink: {
              connect: {
                slug: input.slug,
              },
            },
            utmCampaignSource: input.searchParams.utm_source ?? null,
            utmCampaignMedium: input.searchParams.utm_medium ?? null,
            utmCampaignName: input.searchParams.utm_campaign ?? null,
            utmCampaignTerm: input.searchParams.utm_term ?? null,
            utmCampaignContent: input.searchParams.utm_content ?? null,
          },
        });
      }

      return {
        message: 'Link visited count updated',
      };
    }),
});
