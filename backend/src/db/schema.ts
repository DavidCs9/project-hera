import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  firstLastName: text("first_last_name").notNull(),
  secondLastName: text("second_last_name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  bedNumber: integer("bed_number").notNull(),
  primaryService: text("primary_service").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .references(() => patients.id)
    .notNull(),
  examType: text("exam_type").notNull(),
  requestingService: text("requesting_service").notNull(),
  requestingDoctor: text("requesting_doctor").notNull(),
  requestDate: timestamp("request_date").notNull(),
  resultDate: timestamp("result_date"),
  result: text("result"),
  status: text("status", { enum: ["pending", "completed"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const spanishMessages = {
  required: "Este campo es requerido",
  invalidType: "Tipo de dato inválido",
  invalidEnum: "Valor no válido",
  select: "Seleccione una opción",
};

export const patientSelectSchema = createSelectSchema(patients, {
  name: z.string().min(1, spanishMessages.required),
  firstLastName: z.string().min(1, spanishMessages.required),
  secondLastName: z.string().min(1, spanishMessages.required),
  age: z.number().min(0, spanishMessages.required),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: spanishMessages.invalidEnum }),
  }),
  bedNumber: z.number().min(1, spanishMessages.required),
  primaryService: z.string().min(1, spanishMessages.required),
});

export const patientInsertSchema = createInsertSchema(patients, {
  name: z.string().min(1, spanishMessages.required),
  firstLastName: z.string().min(1, spanishMessages.required),
  secondLastName: z.string().min(1, spanishMessages.required),
  age: z.number().min(0, spanishMessages.required),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: spanishMessages.select }),
  }),
  bedNumber: z.number().min(1, spanishMessages.required),
  primaryService: z.string().min(1, spanishMessages.select),
});

export const examSelectSchema = createSelectSchema(exams, {
  patientId: z.number().min(1, spanishMessages.required),
  examType: z.string().min(1, spanishMessages.required),
  requestingService: z.string().min(1, spanishMessages.required),
  requestingDoctor: z.string().min(1, spanishMessages.required),
  requestDate: z.date({ required_error: spanishMessages.required }),
  status: z.enum(["pending", "completed"], {
    errorMap: () => ({ message: spanishMessages.invalidEnum }),
  }),
});

export const examInsertSchema = createInsertSchema(exams, {
  patientId: z.number().min(1, spanishMessages.required),
  examType: z.string().min(1, spanishMessages.required),
  requestingService: z.string().min(1, spanishMessages.required),
  requestingDoctor: z.string().min(1, spanishMessages.required),
  requestDate: z.date({ required_error: spanishMessages.required }),
  status: z.enum(["pending", "completed"], {
    errorMap: () => ({ message: spanishMessages.invalidEnum }),
  }),
});

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
export type Exam = typeof exams.$inferSelect;
export type NewExam = typeof exams.$inferInsert;
