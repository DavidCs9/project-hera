import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Sidebar, { type FormType } from "@/components/ui/sidebar";
import FormSwitcher from "@/components/ui/form-switcher";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [currentForm, setCurrentForm] = useState<FormType>("pacientes");

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-50px)] bg-gradient-to-b from-blue-100 to-blue-200 p-10 gap-10 ">
      <div className="flex flex-col md:flex-row gap-4 w-full md:max-w-5xl md:mx-auto">
        <Sidebar currentForm={currentForm} onFormChange={setCurrentForm} />
        <FormSwitcher currentForm={currentForm} />
      </div>
    </div>
  );
}
