import { t } from "../trpc.ts";
import { exams, patients } from "../db/schema.ts";
import db from "../db/index.ts";
import { z } from "zod";
import { sql, eq, count } from "drizzle-orm";
import {
  examInputSchema,
  patientInputSchema,
  generateUploadUrlSchema,
  uploadResultSchema,
} from "../validation/schemas.ts";
import { s3Client, S3_BUCKET_NAME } from "../config/s3.ts";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const examRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        patient: patientInputSchema,
        exam: examInputSchema,
      })
    )
    .mutation(async ({ input }) => {
      if (typeof input.exam.requestDate === "string") {
        input.exam.requestDate = new Date(input.exam.requestDate);
      }
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
  getPendingExams: t.procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const pendingExams = await db
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
        .where(eq(exams.status, "pending"))
        .leftJoin(patients, eq(exams.patientId, patients.id))
        .limit(limit)
        .offset(offset);

      const totalCountResult = await db
        .select({ count: count() })
        .from(exams)
        .where(eq(exams.status, "pending"));

      const totalCount = totalCountResult[0]?.count ?? 0;

      return {
        exams: pendingExams,
        totalCount: totalCount,
      };
    }),
  getCompletedExams: t.procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const completedExams = await db
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
        .where(eq(exams.status, "completed"))
        .leftJoin(patients, eq(exams.patientId, patients.id))
        .limit(limit)
        .offset(offset);

      const totalCountResult = await db
        .select({ count: count() })
        .from(exams)
        .where(eq(exams.status, "completed"));

      const totalCount = totalCountResult[0]?.count ?? 0;

      return {
        exams: completedExams,
        totalCount: totalCount,
      };
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
  generateUploadUrl: t.procedure
    .input(generateUploadUrlSchema)
    .mutation(async ({ input }) => {
      const { examId, fileName, contentType } = input;
      const key = `exams/${examId}/${Date.now()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, // URL expires in 1 hour
      });

      return {
        presignedUrl,
        key,
      };
    }),
  uploadResult: t.procedure
    .input(uploadResultSchema)
    .mutation(async ({ input }) => {
      const { examId, s3Key } = input;
      const s3Url = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;

      // Update the exam record
      await db
        .update(exams)
        .set({
          status: "completed",
          result: s3Url,
          resultDate: new Date(),
        })
        .where(eq(exams.id, examId));

      return {
        message: "Exam updated successfully",
        url: s3Url,
      };
    }),
  getPdfUrl: t.procedure
    .input(
      z.object({
        examId: z.number().positive(),
      })
    )
    .query(async ({ input }) => {
      // Get the exam to find the S3 key from the result URL
      const exam = await db
        .select({
          result: exams.result,
        })
        .from(exams)
        .where(eq(exams.id, input.examId))
        .limit(1);

      if (!exam[0]?.result) {
        throw new Error("Exam result not found");
      }

      // Extract the S3 key from the result URL
      const resultUrl = exam[0].result;
      const key = resultUrl.split(`${S3_BUCKET_NAME}.s3.amazonaws.com/`)[1];

      // Generate presigned URL for GET operation
      const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, // URL expires in 1 hour
      });

      return {
        presignedUrl,
      };
    }),
});

export type ExamRouter = typeof examRouter;
