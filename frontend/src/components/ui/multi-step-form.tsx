import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import PatientForm from "@/components/forms/PatientForm";
import ExamForm from "@/components/forms/ExamForm";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";
import {
  type NewExam,
  type NewPatient,
} from "../../../../backend/src/validation/schemas";
export default function MultiStepForm() {
  const [step, setStep] = useState<"patient" | "exam" | "success">("patient");
  const [exam, setExam] = useState<NewExam | null>(null);
  const [patient, setPatient] = useState<NewPatient>();

  // --- Corrected useMutation setup ---
  const {
    mutate, // The function to call to trigger the mutation
    isPending, // Loading state for the mutation
  } = useMutation({
    // 1. Spread the base mutation options from tRPC
    ...trpc.exam.create.mutationOptions(),
    // 2. Add standard react-query mutation callbacks (optional but recommended)
    onSuccess: (data) => {
      // 'data' here is the return value from your tRPC mutation ({ message: ... })
      console.log("Mutation successful:", data.message);
      // Reset state, navigate, show success message, etc.
      setStep("success");
      setPatient(undefined); // Clear form state on success
      setExam(null);
      toast.success("Solicitud creada con éxito");
    },
    onError: (error) => {
      // 'error' here is the TRPCClientErrorLike
      console.error("Mutation failed:", error);
      toast.error("Error al crear la solicitud");
      // Display an error message to the user
    },
  });

  const onPatientSubmit = async (data: NewPatient) => {
    setPatient(data);
    setStep("exam");
  };

  const onExamSubmit = async (data: NewExam) => {
    setExam(data);

    if (!patient || !exam) {
      console.error("Patient or exam is not defined");
      return;
    }

    mutate({
      patient: patient,
      exam: exam,
    });
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step === "patient"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-primary/20 border-primary"
          }`}
        >
          {step === "patient" ? "1" : <CheckIcon className="h-4 w-4" />}
        </div>
        <div className="w-12 h-1 bg-gray-200">
          <div
            className={`h-full ${
              step === "exam" || step === "success"
                ? "bg-primary"
                : "bg-gray-200"
            }`}
            style={{
              width: step === "exam" || step === "success" ? "100%" : "0%",
            }}
          ></div>
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step === "exam"
              ? "bg-primary text-primary-foreground border-primary"
              : step === "success"
              ? "bg-primary/20 border-primary"
              : "bg-gray-200 border-gray-300"
          }`}
        >
          {step === "success" ? <CheckIcon className="h-4 w-4" /> : "2"}
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckIcon className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold">¡Solicitud Creada con Éxito!</h3>
      <div className="bg-white/50 p-4 rounded-lg text-left space-y-4 flex flex-row justify-between max-w-2xl mx-auto">
        <div>
          <h4 className="font-medium">Información del Paciente</h4>
          <p className="text-sm text-gray-600">
            {patient?.name} {patient?.firstLastName} {patient?.secondLastName}
          </p>
          <p className="text-sm text-gray-600">
            {patient?.gender === "male" ? "Masculino" : "Femenino"} |{" "}
            {patient?.age} años
          </p>
          <p className="text-sm text-gray-600">Cama: {patient?.bedNumber}</p>
        </div>
        <div>
          <h4 className="font-medium">Detalles del Examen</h4>
          <p className="text-sm text-gray-600">
            Fecha de Solicitud: {exam?.requestDate.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Doctor Solicitante: {exam?.requestingDoctor}
          </p>
          <p className="text-sm text-gray-600">
            Tipo: {exam?.examType} | Servicio:{" "}
            {exam?.requestingService === "urology"
              ? "Urología"
              : exam?.requestingService === "hematology"
              ? "Hematología"
              : exam?.requestingService === "cardiology"
              ? "Cardiología"
              : ""}
          </p>
        </div>
      </div>
      <div className="pt-4">
        <Button
          onClick={() => {
            setStep("patient");
            setExam(null);
          }}
        >
          Nueva Solicitud
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nueva Solicitud de Examen</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}

        {step === "patient" ? (
          <PatientForm onSubmit={onPatientSubmit} isLoading={isPending} />
        ) : step === "exam" ? (
          patient && (
            <ExamForm
              onSubmit={onExamSubmit}
              onBack={() => setStep("patient")}
              isLoading={isPending}
              exam={exam}
              patient={patient}
            />
          )
        ) : (
          renderSuccessStep()
        )}
      </CardContent>
    </Card>
  );
}
