import { z } from "zod";
import { t } from "../trpc.ts";

export const generalRouter = t.router({
  hello: t.procedure.input(z.string()).query(({ input }) => {
    return `Hello ${input ?? "world"}!`;
  }),
});
