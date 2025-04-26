// backend/src/db/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  // ... columns remain the same
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  firstLastName: text("first_last_name").notNull(),
  secondLastName: text("second_last_name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: text("role", { enum: ["admin", "doctor", "reviewer"] }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// KEEP the type exports
export type Patient = typeof patients.$inferSelect;
export type Exam = typeof exams.$inferSelect;
export type User = typeof users.$inferSelect;
