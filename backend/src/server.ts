// server.ts (modified)
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import { appRouter } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json()); // Important for parsing request bodies

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

// Create a tRPC caller (for calling procedures directly)
const caller = appRouter.createCaller({});

// --- HTTP Wrappers ---
app.get("/hello", async (req, res) => {
  try {
    const result = await caller.general.hello("Alecita Doe");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
