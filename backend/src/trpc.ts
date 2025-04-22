import { initTRPC, TRPCError } from "@trpc/server";
import superJSON from "superjson";
import { User } from "./db/schema.js";

type Context = {
  user: User | null;
};

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superJSON,
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({ ctx });
});
export { t };
