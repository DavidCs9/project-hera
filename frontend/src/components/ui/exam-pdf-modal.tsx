import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

type ExamPdfModalProps = {
  exam: {
    id: number;
    examType: string;
    result: string;
    resultDate: Date;
  };
  isOpen: boolean;
  onClose: () => void;
};

export function ExamPdfModal({ exam, isOpen, onClose }: ExamPdfModalProps) {
  const { data: pdfUrl, isLoading } = useQuery({
    ...trpc.exam.getPdfUrl.queryOptions({
      examId: exam.id,
    }),
    enabled: isOpen,
  });

  const handleDownload = () => {
    if (!pdfUrl?.presignedUrl) return;
    window.open(pdfUrl.presignedUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] lg:max-w-[80vw] h-[90vh] max-h-[800px] p-0 flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 border-b h-fit">
          <DialogTitle className="text-lg">Resultado del Examen</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">
                Tipo de Examen:{" "}
                <span className="text-muted-foreground">{exam.examType}</span>
              </p>
              <p className="text-sm font-medium">
                Fecha de Resultado:{" "}
                <span className="text-muted-foreground">
                  {new Date(exam.resultDate).toLocaleDateString()}
                </span>
              </p>
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              disabled={isLoading || !pdfUrl?.presignedUrl}
              className="w-full sm:w-auto"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </div>
          <div className="flex-1 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : pdfUrl?.presignedUrl ? (
              <iframe
                src={pdfUrl.presignedUrl}
                className="w-full h-full border rounded-lg shadow-sm"
                title="PDF Viewer"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg text-muted-foreground">
                No se pudo cargar el PDF
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
