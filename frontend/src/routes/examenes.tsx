import { createFileRoute } from "@tanstack/react-router";
import SidebarSubir, { OptionsSubir } from "@/components/ui/sidebarSubir";
import SubirSwitcher from "@/components/ui/SubirSwticher";
import { useState } from "react";

export const Route = createFileRoute("/examenes")({
  component: Examenes,
});

function Examenes() {
  const [currentForm, setCurrentForm] = useState<OptionsSubir>("pendientes");
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-59px)] bg-gradient-to-b from-blue-100 to-blue-200 p-10 gap-10 ">
      <header className="w-full text-center">
        <h1 className="text-2xl font-bold">Proyecto Doctor Otter</h1>
      </header>
      <div className="flex flex-row gap-4 w-full md:max-w-5xl md:mx-auto">
        <SidebarSubir currentForm={currentForm} onFormChange={setCurrentForm} />
        <SubirSwitcher currentForm={currentForm} />
      </div>
    </div>
  );
}
