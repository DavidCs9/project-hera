import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/utils/trpc";

export default Pendientes;

const ITEMS_PER_PAGE = 2;

function Pendientes() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    ...trpc.exam.getPendingExams.queryOptions({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }),
  });

  const exams = data?.exams;
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (isLoading && !exams) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading pending exams</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Exámenes Pendientes</h2>
      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
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
                  Servicio
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Fecha
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {exams?.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
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
                      Cama: {exam.patient?.bedNumber}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Servicio Principal: {exam.patient?.primaryService}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="font-medium">{exam.examType}</div>
                    <div className="text-sm text-muted-foreground">
                      Solicitado por: {exam.requestingDoctor}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="text-sm">{exam.requestingService}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="text-sm">
                      {format(exam.requestDate, "PPP", { locale: es })}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant="secondary">Pendiente</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {exams?.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay exámenes pendientes</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
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
      )}
    </div>
  );
}
