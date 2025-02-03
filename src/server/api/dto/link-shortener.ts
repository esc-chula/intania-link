import { z } from 'zod';

export const GetShortenedLinkBySlugDto = z.object({
  slug: z.string(),
});
