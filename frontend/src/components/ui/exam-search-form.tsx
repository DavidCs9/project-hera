"use client";

import type React from "react";

import { Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { mockApi } from "@/lib/mock-api";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default ExamSearchForm;

const searchFormSchema = z.object({
  firstLastName: z.string({
    required_error: "El apellido paterno es requerido",
  }),
  secondLastName: z.string({
    required_error: "El apellido materno es requerido",
  }),
  names: z.string({
    required_error: "El nombre es requerido",
  }),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

function ExamSearchForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
    defaultValues: {
      firstLastName: "",
      secondLastName: "",
      names: "",
    },
  });

  const {
    data: exams,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["exams", fullName],
    queryFn: ({ queryKey }) => {
      setIsSubmitted(true);
      if (!fullName) return null;
      console.log(fullName);
      return mockApi.exams.getByFullName(fullName);
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    const fullName = `${data.names} ${data.firstLastName} ${data.secondLastName}`;
    setFullName(fullName);
    refetch();
  };

  return (
    <Card className="w-full shadow-lg h-fit">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Paterno</FormLabel>
                    <FormControl>
                      <Input placeholder="Ejemplo: Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Materno</FormLabel>
                    <FormControl>
                      <Input placeholder="Ejemplo: Gomez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="names"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre (s)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ejemplo: Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Buscando..." : "Buscar Resultados de Exámenes"}
            </Button>
          </form>
        </Form>

        {isError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "Error al buscar el paciente"}
            </AlertDescription>
          </Alert>
        )}

        {exams && (
          <div className="mt-6 bg-white/50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">
              Información del Paciente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre completo</p>
                <p className="font-medium">
                  {exams[0].patient.name} {exams[0].patient.firstLastName}{" "}
                  {exams[0].patient.secondLastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Edad / Género</p>
                <p className="font-medium">
                  {exams[0].patient.age} años /{" "}
                  {exams[0].patient.gender === "male"
                    ? "Masculino"
                    : "Femenino"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Número de Cama</p>
                <p className="font-medium">{exams[0].patient.bedNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Servicio Principal
                </p>
                <p className="font-medium">
                  {exams[0].patient.primaryService === "urology"
                    ? "Urología"
                    : exams[0].patient.primaryService === "hematology"
                    ? "Hematología"
                    : exams[0].patient.primaryService === "cardiology"
                    ? "Cardiología"
                    : exams[0].patient.primaryService}
                </p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && !exams && isSubmitted && fullName && (
          <Alert className="mt-4">
            <AlertDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              No se encontró ningún paciente con los datos proporcionados
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
