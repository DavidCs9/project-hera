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
app.post("/testCreateExam", async (req, res) => {
  try {
    const body = {
      patient: {
        name: "John",
        firstLastName: "Doe",
        secondLastName: "Smith",
        age: 45,
        gender: "male" as const,
        bedNumber: 101,
        primaryService: "Cardiology",
      },
      exam: {
        patientId: 1,
        examType: "ECG",
        requestingService: "Cardiology",
        requestingDoctor: "Dr. House",
        requestDate: new Date("2024-01-01T10:00:00.000Z"),
        result: "Normal sinus rhythm",
        status: "pending" as const,
      },
    };

    const result = await caller.exam.create(body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/testGetPendingExams", async (req, res) => {
  try {
    const pendingExams = await caller.exam.getPendingExams({
      page: 1,
      limit: 10,
    });
    res.json(pendingExams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/testGetByFullName", async (req, res) => {
  try {
    const fullName = {
      name: "John",
      firstLastName: "Doe",
      secondLastName: "Smith",
    };
    const result = await caller.exam.getByFullName(fullName);
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
