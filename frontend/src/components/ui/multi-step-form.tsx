import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Exam } from "@/lib/schemas/exam";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import PatientForm from "@/components/forms/PatientForm";
import ExamForm from "@/components/forms/ExamForm";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { examService } from "@/lib/db/exam-service";
import { Patient } from "@/lib/schemas/patient";

export default function MultiStepForm() {
  const [step, setStep] = useState<"patient" | "exam" | "success">("patient");
  const [exam, setExam] = useState<Exam | null>(null);
  const [patient, setPatient] = useState<Patient>();

  // Create exam mutation
  const { mutate: createExam, isPending: isCreatingExam } = useMutation({
    mutationFn: examService.create,
    onSuccess: (data) => {
      setExam(data);
      setStep("success");
      toast.success("Solicitud de examen creada exitosamente");
    },
    onError: (error: Error) => {
      toast.error("Error al crear examen: " + error.message);
    },
  });

  const onPatientSubmit = async (data: Patient) => {
    setPatient(data);
    setStep("exam");
  };

  const onExamSubmit = async (data: Exam) => {
    setExam(data);
    createExam(data);
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
            {exam?.patient.name} {exam?.patient.firstLastName}{" "}
            {exam?.patient.secondLastName}
          </p>
          <p className="text-sm text-gray-600">
            {exam?.patient.gender === "male" ? "Masculino" : "Femenino"} |{" "}
            {exam?.patient.age} años
          </p>
          <p className="text-sm text-gray-600">
            Cama: {exam?.patient.bedNumber}
          </p>
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
          <PatientForm onSubmit={onPatientSubmit} isLoading={isCreatingExam} />
        ) : step === "exam" ? (
          patient && (
            <ExamForm
              onSubmit={onExamSubmit}
              onBack={() => setStep("patient")}
              isLoading={isCreatingExam}
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
