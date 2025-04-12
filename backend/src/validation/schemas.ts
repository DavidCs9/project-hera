// backend/src/validation/schemas.ts
import { z } from "zod";

const spanishMessages = {
  required: "Este campo es requerido",
  invalidType: "Tipo de dato inválido",
  invalidEnum: "Valor no válido",
  select: "Seleccione una opción",
  minBedNumber: "El número mínimo es 1",
};

export const patientInputSchema = z.object({
  name: z.string().min(1, spanishMessages.required),
  firstLastName: z.string().min(1, spanishMessages.required),
  secondLastName: z.string().min(1, spanishMessages.required),
  age: z
    .number({ invalid_type_error: spanishMessages.invalidType })
    .min(0, spanishMessages.required), // Use number() for zod
  gender: z.enum(["male", "female"]),
  bedNumber: z
    .number({ invalid_type_error: spanishMessages.invalidType })
    .min(1, spanishMessages.minBedNumber),
  primaryService: z.string().min(1, spanishMessages.select),
});

// Manual Zod schema for inserting/updating exams
export const examInputSchema = z.object({
  patientId: z
    .number({ invalid_type_error: spanishMessages.invalidType })
    .min(1, spanishMessages.required),
  examType: z.string().min(1, spanishMessages.required),
  requestingService: z.string().min(1, spanishMessages.required),
  requestingDoctor: z.string().min(1, spanishMessages.required),
  requestDate: z.date({
    required_error: spanishMessages.required,
  }),
  status: z.enum(["pending", "completed"]),
  result: z.string().optional(),
  resultDate: z.date().optional().nullable(),
});

export const generateUploadUrlSchema = z.object({
  examId: z.number().positive(),
  fileName: z.string(),
  contentType: z.string(),
});

export const uploadResultSchema = z.object({
  examId: z.number().positive(),
  s3Key: z.string(),
});

//  types
export type NewPatient = z.infer<typeof patientInputSchema>;
export type NewExam = z.infer<typeof examInputSchema>;
export type GenerateUploadUrl = z.infer<typeof generateUploadUrlSchema>;
export type UploadResult = z.infer<typeof uploadResultSchema>;
