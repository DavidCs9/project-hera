import { t } from "../trpc.ts";
import {
  exams,
  examInsertSchema,
  patientInsertSchema,
  patients,
} from "../db/schema.ts";
import db from "../db/index.ts";
import { z } from "zod";

export const examRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        patient: patientInsertSchema,
        exam: examInsertSchema,
      })
    )
    .mutation(async ({ input }) => {
      db.transaction(async (tx) => {
        const [patient] = await tx
          .insert(patients)
          .values(input.patient)
          .returning();
        await tx.insert(exams).values({
          ...input.exam,
          patientId: patient.id,
        });
      });

      return {
        message: "Exam created successfully",
      };
    }),
});

export type ExamRouter = typeof examRouter;
