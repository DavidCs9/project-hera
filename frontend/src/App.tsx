import { useState } from "react";
import Sidebar, { type FormType } from "@/components/ui/sidebar";
import FormSwitcher from "@/components/ui/form-switcher";

export default function PacientesPage() {
  const [currentForm, setCurrentForm] = useState<FormType>("pacientes");

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-10 gap-10 ">
      <header className="w-full text-center">
        <h1 className="text-2xl font-bold">Proyecto Doctor Otter</h1>
      </header>
      <div className="flex flex-row gap-4 w-full md:max-w-5xl md:mx-auto">
        <Sidebar currentForm={currentForm} onFormChange={setCurrentForm} />
        <FormSwitcher currentForm={currentForm} />
      </div>
    </div>
  );
}
