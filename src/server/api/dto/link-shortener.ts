import { z } from 'Zod';

export const GetShortenedLinkBySlugDto = z.object({
  slug: z.string(),
});
