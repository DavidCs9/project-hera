import { Button } from "@/components/ui/button";
import { Card } from "./card";

export type FormType = "pacientes" | "fechas" | "servicios" | "nueva-solicitud";

interface SidebarProps {
  onFormChange: (form: FormType) => void;
  currentForm: FormType;
}

export default function Sidebar({ onFormChange, currentForm }: SidebarProps) {
  return (
    <Card className="w-fit h-fit flex flex-col gap-2 p-4">
      <Button
        variant="outline"
        onClick={() => onFormChange("pacientes")}
        className={
          currentForm === "pacientes"
            ? "bg-cyan-500/40 text-gray-900 cursor-pointer hover:bg-cyan-600/40 "
            : "bg-transparent text-gray-600"
        }
      >
        Pacientes
      </Button>
      <Button
        variant="outline"
        onClick={() => onFormChange("nueva-solicitud")}
        className={
          currentForm === "nueva-solicitud"
            ? "bg-cyan-500/40 text-gray-900 cursor-pointer hover:bg-cyan-600/40 "
            : "bg-transparent text-gray-600"
        }
      >
        Nueva Solicitud
      </Button>
    </Card>
  );
}
