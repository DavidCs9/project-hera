import { t } from "../trpc.ts";
import {
  exams,
  examInsertSchema,
  patientInsertSchema,
  patients,
} from "../db/schema.ts";
import db from "../db/index.ts";
import { z } from "zod";
import { sql, eq } from "drizzle-orm";

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
  getPendingExams: t.procedure.query(async () => {
    return db
      .select({
        id: exams.id,
        examType: exams.examType,
        requestingService: exams.requestingService,
        requestingDoctor: exams.requestingDoctor,
        requestDate: exams.requestDate,
        status: exams.status,
        patient: {
          name: patients.name,
          firstLastName: patients.firstLastName,
          secondLastName: patients.secondLastName,
          age: patients.age,
          gender: patients.gender,
          bedNumber: patients.bedNumber,
          primaryService: patients.primaryService,
        },
      })
      .from(exams)
      .where(sql`${exams.status} = 'pending'`)
      .leftJoin(patients, sql`${exams.patientId} = ${patients.id}`);
  }),
  getByFullName: t.procedure
    .input(
      z.object({
        name: z.string(),
        firstLastName: z.string(),
        secondLastName: z.string(),
      })
    )
    .query(async ({ input }) => {
      return db
        .select({
          id: exams.id,
          examType: exams.examType,
          requestingService: exams.requestingService,
          requestingDoctor: exams.requestingDoctor,
          requestDate: exams.requestDate,
          resultDate: exams.resultDate,
          result: exams.result,
          status: exams.status,
          patient: {
            name: patients.name,
            firstLastName: patients.firstLastName,
            secondLastName: patients.secondLastName,
            age: patients.age,
            gender: patients.gender,
            bedNumber: patients.bedNumber,
            primaryService: patients.primaryService,
          },
        })
        .from(exams)
        .leftJoin(patients, eq(exams.patientId, patients.id))
        .where(
          sql`CONCAT(${patients.name}, ' ', ${patients.firstLastName}, ' ', ${
            patients.secondLastName
          }) ILIKE ${`%${input.name} ${input.firstLastName} ${input.secondLastName}%`}`
        );
    }),
});

export type ExamRouter = typeof examRouter;
