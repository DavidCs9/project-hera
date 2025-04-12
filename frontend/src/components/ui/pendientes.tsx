import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { ExamUploadModal } from "./exam-upload-modal";

export default Pendientes;

const ITEMS_PER_PAGE = 5;

type Patient = {
  name: string;
  firstLastName: string;
  secondLastName: string;
  age: number;
  gender: "male" | "female";
  bedNumber: number;
  primaryService: string;
};

export type PendingExam = {
  id: number;
  examType: string;
  requestingService: string;
  requestingDoctor: string;
  requestDate: Date;
  status: "pending" | "completed";
  patient: Patient | null;
};

function Pendientes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExam, setSelectedExam] = useState<PendingExam | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    ...trpc.exam.getPendingExams.queryOptions({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }),
  });

  const exams = data?.exams;
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Filter exams based on search query
  const filteredExams = useMemo(() => {
    if (!exams) return [];
    if (!searchQuery) return exams;

    const query = searchQuery.toLowerCase();
    return exams.filter((exam) => {
      if (!exam.patient) return false;
      const fullName =
        `${exam.patient.name} ${exam.patient.firstLastName} ${exam.patient.secondLastName}`.toLowerCase();
      return fullName.includes(query);
    });
  }, [exams, searchQuery]);

  if (isLoading && !exams) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading pending exams</div>;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre de paciente..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b bg-muted/50">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Paciente
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Información
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Examen
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Fecha de Solicitud
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                    onClick={() => setSelectedExam(exam)}
                  >
                    <td className="p-4 align-middle">
                      <div className="font-medium">
                        {exam.patient?.name} {exam.patient?.firstLastName}{" "}
                        {exam.patient?.secondLastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exam.patient?.age} años •{" "}
                        {exam.patient?.gender === "male"
                          ? "Masculino"
                          : "Femenino"}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="text-sm">
                        Servicio:{" "}
                        {exam.patient?.primaryService === "urology"
                          ? "Urología"
                          : exam.patient?.primaryService === "hematology"
                          ? "Hematología"
                          : exam.patient?.primaryService === "cardiology"
                          ? "Cardiología"
                          : exam.patient?.primaryService}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cama: {exam.patient?.bedNumber}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{exam.examType}</div>
                      <div className="text-sm text-muted-foreground">
                        Solicitado por: {exam.requestingDoctor}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="text-sm whitespace-nowrap">
                        {format(exam.requestDate, "dd/MM/yy HH:mm", {
                          locale: es,
                        })}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="pending">Pendiente</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {filteredExams.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No se encontraron exámenes pendientes"
              : "No hay exámenes pendientes"}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages} ({totalCount} resultados)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || isLoading}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {selectedExam && (
        <ExamUploadModal
          exam={selectedExam}
          isOpen={!!selectedExam}
          onClose={() => setSelectedExam(null)}
        />
      )}
    </div>
  );
}
