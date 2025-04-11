"use client";

import { OptionsSubir } from "./sidebarSubir";
import Pendientes from "./pendientes";

export default SubirSwitcher;

interface FormSwitcherProps {
  currentForm: OptionsSubir;
}

function SubirSwitcher({ currentForm }: FormSwitcherProps) {
  switch (currentForm) {
    case "pendientes":
      return <Pendientes />;
    case "completados":
      return <div>Form for Completados (Coming soon)</div>;
    default:
      return <div>Select a form from the sidebar</div>;
  }
}
