// server.ts (modified)
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import { appRouter } from "./routes/index.js";
import { testEndpoints } from "./testEndpoints.js";

const app = express();
app.use(cors());
app.use(express.json()); // Important for parsing request bodies

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

// Register test endpoints
testEndpoints(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
