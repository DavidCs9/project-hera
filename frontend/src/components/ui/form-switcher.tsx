"use client";

import { type FormType } from "./sidebar";
import ExamSearchForm from "./exam-search-form";
import MultiStepForm from "./multi-step-form";

interface FormSwitcherProps {
  currentForm: FormType;
}

export default function FormSwitcher({ currentForm }: FormSwitcherProps) {
  switch (currentForm) {
    case "pacientes":
      return <ExamSearchForm />;
    case "fechas":
      return <div>Form for Fechas (Coming soon)</div>;
    case "servicios":
      return <div>Form for Servicios (Coming soon)</div>;
    case "nueva-solicitud":
      // return <MultiStepForm />;
      return <div>Form for Nueva Solicitud (Coming soon)</div>;
    default:
      return <div>Select a form from the sidebar</div>;
  }
}
