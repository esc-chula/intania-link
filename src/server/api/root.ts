import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { countRouter } from "./routers/count";

export const appRouter = createTRPCRouter({
    count: countRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
