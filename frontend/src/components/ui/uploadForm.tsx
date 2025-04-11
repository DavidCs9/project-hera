import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Exam, examSchema } from "@/lib/schemas/exam";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { ServiceEnum } from "@/lib/schemas/service";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadForm() {
  const form = useForm<Exam>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      patientId: "",
      examType: "",
      requestingService: "urology",
      requestDate: new Date(),
      resultDate: null,
      result: null,
      status: "pending",
    },
  });

  const onSubmit = (data: Exam) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Solicitud</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Examen</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipo de examen" {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

            <Button type="submit" className="w-full">
              Crear Solicitud
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
