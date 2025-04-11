import { t } from "../trpc.ts";
import { generalRouter } from "./general.ts";
import { examRouter } from "./exam.ts";

export const appRouter = t.router({
  general: generalRouter,
  exam: examRouter,
});

export type AppRouter = typeof appRouter;
