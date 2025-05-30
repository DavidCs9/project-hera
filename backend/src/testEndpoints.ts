import express from "express";
import { appRouter } from "./routes/index.js";
import path from "path";
import fs from "fs";

// Create a tRPC caller (for calling procedures directly)
const caller = appRouter.createCaller({});

export const testEndpoints = (app: express.Application) => {
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

  app.post("/testUploadResult", async (req, res) => {
    try {
      // Get the current directory path
      const __dirname = path.dirname(new URL(import.meta.url).pathname);

      // Read the dummy.pdf file
      const filePath = path.join(__dirname, "..", "dummy.pdf");
      const fileBuffer = fs.readFileSync(filePath);

      const body = {
        examId: 1,
        s3Key: "dummy.pdf",
      };
      const result = await caller.exam.uploadResult(body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
