"use client";

import { type FormType } from "./sidebar";
import ExamSearchForm from "./exam-search-form";
import MultiStepForm from "./multi-step-form";

interface FormSwitcherProps {
  currentForm: FormType;
}

export default function FormSwitcher({ currentForm }: FormSwitcherProps) {
  let content;
  switch (currentForm) {
    case "pacientes":
      content = <ExamSearchForm />;
      break;
    case "fechas":
      content = <div>Form for Fechas (Coming soon)</div>;
      break;
    case "servicios":
      content = <div>Form for Servicios (Coming soon)</div>;
      break;
    case "nueva-solicitud":
      content = <MultiStepForm />;
      break;
    default:
      content = <div>Select a form from the sidebar</div>;
  }
  return <div className="w-full">{content}</div>;
}
