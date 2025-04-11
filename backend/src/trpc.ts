import { initTRPC } from "@trpc/server";
import superJSON from "superjson";
// Initialize tRPC
const t = initTRPC.create({
  transformer: superJSON,
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export { t };
