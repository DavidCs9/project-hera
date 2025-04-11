// backend/src/db/schema.ts
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  // ... columns remain the same
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
  // ... columns remain the same
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

// KEEP the type exports
export type Patient = typeof patients.$inferSelect;
export type Exam = typeof exams.$inferSelect;
