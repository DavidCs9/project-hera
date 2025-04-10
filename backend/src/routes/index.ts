import { t } from "../trpc.ts";
import { generalRouter } from "./general.ts";

export const appRouter = t.router({
  general: generalRouter,
});

export type AppRouter = typeof appRouter;
