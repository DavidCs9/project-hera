import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  examInputSchema,
  NewExam,
  NewPatient,
} from "../../../../backend/src/validation/schemas";
interface ExamFormProps {
  onSubmit: (data: NewExam) => void;
  onBack: () => void;
  exam: NewExam | null;
  patient: NewPatient;
  isLoading?: boolean;
}

export default function ExamForm({
  onSubmit,
  onBack,
  patient,
  isLoading = false,
}: ExamFormProps) {
  const form = useForm<NewExam>({
    resolver: zodResolver(examInputSchema),
    defaultValues: {
      patientId: 1,
      requestingService: patient?.primaryService || "",
      requestDate: new Date(),
      resultDate: null,
      status: "pending",
      requestingDoctor: "",
      examType: "",
    },
  });

  return (
    <>
      {/* Show patient info without form */}
      <div className="bg-white/50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 gap-2">
          <h2 className="text-lg font-semibold border-b pb-2 mb-1">
            Información del Paciente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Nombre completo</p>
              <p className="font-medium">
                {patient?.name || "Juan"} {patient?.firstLastName || "Perez"}{" "}
                {patient?.secondLastName || "Gomez"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Edad / Género</p>
              <p className="font-medium">
                {patient?.age || "25"} años /{" "}
                {patient?.gender === "male" ? "Masculino" : "Femenino"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cama / Servicio</p>
              <p className="font-medium">
                {patient?.bedNumber || "0"} /{" "}
                {patient?.primaryService === "urology"
                  ? "Urología"
                  : patient?.primaryService === "hematology"
                  ? "Hematología"
                  : patient?.primaryService === "cardiology"
                  ? "Cardiología"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="requestDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Solicitud</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestingService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio Solicitante</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="urology">Urología</SelectItem>
                      <SelectItem value="hematology">Hematología</SelectItem>
                      <SelectItem value="cardiology">Cardiología</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Examen</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tipo de examen"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestingDoctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Solicitante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doctor Solicitante"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onBack}
              disabled={isLoading}
            >
              Atrás
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? "Creando Solicitud..." : "Crear Solicitud"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
