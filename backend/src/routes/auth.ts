import db from "../db/index.ts";
import { publicProcedure, router } from "../trpc.ts";
import z from "zod";
import { users } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;
    const res = await db.select().from(users).where(eq(users.email, email));
    const user = res[0];
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
    if (user.password !== password) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
    return {
      message: "Login successful",
      user: user,
    };
  }),
});
