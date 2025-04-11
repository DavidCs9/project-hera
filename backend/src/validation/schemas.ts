// backend/src/validation/schemas.ts
import { z } from "zod";

const spanishMessages = {
  required: "Este campo es requerido",
  invalidType: "Tipo de dato inválido",
  invalidEnum: "Valor no válido",
  select: "Seleccione una opción",
  minBedNumber: "El número mínimo es 1",
};

// Manual Zod schema for inserting/updating patients (combine if needed)
export const patientInputSchema = z.object({
  name: z.string().min(1, spanishMessages.required),
  firstLastName: z.string().min(1, spanishMessages.required),
  secondLastName: z.string().min(1, spanishMessages.required),
  age: z
    .number({ invalid_type_error: spanishMessages.invalidType })
    .min(0, spanishMessages.required), // Use number() for zod
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: spanishMessages.select }), // Use 'select' for enum dropdowns usually
  }),
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
    invalid_type_error: spanishMessages.invalidType,
  }),
  status: z.enum(["pending", "completed"], {
    errorMap: () => ({ message: spanishMessages.invalidEnum }),
  }),
  // result and resultDate might be optional or handled differently
  result: z.string().optional(),
  resultDate: z.date().optional().nullable(),
});

//  types
export type NewPatient = z.infer<typeof patientInputSchema>;
export type NewExam = z.infer<typeof examInputSchema>;
