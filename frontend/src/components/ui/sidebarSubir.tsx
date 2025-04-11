import { Button } from "@/components/ui/button";
import { Card } from "./card";

export default SidebarSubir;
export type OptionsSubir = "pendientes" | "completados";

interface SidebarProps {
  onFormChange: (form: OptionsSubir) => void;
  currentForm: OptionsSubir;
}

function SidebarSubir({ onFormChange, currentForm }: SidebarProps) {
  return (
    <Card className="w-fit h-fit flex flex-col gap-2 p-4">
      <Button
        variant="outline"
        onClick={() => onFormChange("pendientes")}
        className={
          currentForm === "pendientes"
            ? "bg-cyan-500/40 text-gray-900 cursor-pointer hover:bg-cyan-600/40 "
            : "bg-transparent text-gray-600"
        }
      >
        Pendientes
      </Button>
      <Button
        variant="outline"
        onClick={() => onFormChange("completados")}
        className={
          currentForm === "completados"
            ? "bg-cyan-500/40 text-gray-900 cursor-pointer hover:bg-cyan-600/40 "
            : "bg-transparent text-gray-600"
        }
      >
        Completados
      </Button>
    </Card>
  );
}
