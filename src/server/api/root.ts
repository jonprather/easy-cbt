import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { CBTFormRouter } from "./routers/CBTForm";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  CBT: CBTFormRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
