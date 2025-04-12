import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMutation } from "@tanstack/react-query";
import {
  FileUpload,
  fileUploadSchema,
} from "../../../../backend/src/validation/schemas";
import { toast } from "sonner";
import { PendingExam } from "./pendientes";

type ExamUploadModalProps = {
  exam: PendingExam;
  isOpen: boolean;
  onClose: () => void;
};

export function ExamUploadModal({
  exam,
  isOpen,
  onClose,
}: ExamUploadModalProps) {
  const form = useForm<FileUpload>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      examId: exam.id,
    },
  });

  const { mutate, isPending } = useMutation({
    ...trpc.exam.uploadResult.mutationOptions(),
    onSuccess: (data) => {
      console.log("Mutation successful:", data.message);
      toast.success("Resultado subido con éxito");
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const onSubmit = async (data: FileUpload) => {
    try {
      mutate(data);
      onClose();
      // You might want to trigger a refetch of the pending exams here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Subir Resultado de Examen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Paciente</h4>
              <p className="text-sm text-muted-foreground">
                {exam.patient?.name} {exam.patient?.firstLastName}{" "}
                {exam.patient?.secondLastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {exam.patient?.age} años •{" "}
                {exam.patient?.gender === "male" ? "Masculino" : "Femenino"}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Información</h4>
              <p className="text-sm text-muted-foreground">
                Servicio: {exam.patient?.primaryService}
              </p>
              <p className="text-sm text-muted-foreground">
                Cama: {exam.patient?.bedNumber}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Detalles del Examen</h4>
            <p className="text-sm text-muted-foreground">
              Tipo: {exam.examType}
            </p>
            <p className="text-sm text-muted-foreground">
              Fecha de Solicitud:{" "}
              {format(exam.requestDate, "PPP", { locale: es })}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange }, ...field }) => (
                  <FormItem>
                    <FormLabel>Archivo PDF</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Subir Resultado
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
