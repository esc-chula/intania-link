import { GetShortenedLinkBySlugDto } from '../dto/link-shortener';
import { createTRPCRouter, trpc } from '../trpc';

export const linkShortenerRouter = createTRPCRouter({
  getBySlug: trpc
    .input(GetShortenedLinkBySlugDto)
    .query(async ({ ctx, input }) => {
      try {
        const shortenedLink = await ctx.db.userShortenedLink
          .findFirst({
            where: {
              slug: input.slug,
            },
          })
          .catch((error: unknown) => {
            throw new Error(
              error instanceof Error
                ? error.message
                : 'Something went wrong fetching shortened link',
            );
          });

        if (!shortenedLink) {
          return {
            success: false,
            message: `Shortened link with the slug "${input.slug}" not found`,
            errors: ['Shortened link not found'],
          };
        }

        return {
          success: true,
          message: `Successfully fetched shortened link with the slug "${input.slug}"`,
          data: shortenedLink,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch shortened link',
          errors: [
            error instanceof Error ? error.message : 'Something went wrong',
          ],
        };
      }
    }),
});
