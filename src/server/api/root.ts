import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';

import { linkShortenerRouter } from './routers/link-shortener';
import { linkShortenerRecordsRouter } from './routers/link-shortener-records';

export const appRouter = createTRPCRouter({
  linkShortener: linkShortenerRouter,
  linkShortenerRecrods: linkShortenerRecordsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
