import { OptionsSubir } from "./sidebarSubir";
import Pendientes from "./pendientes";
import Completados from "./completados";

export default SubirSwitcher;

interface FormSwitcherProps {
  currentForm: OptionsSubir;
}

function SubirSwitcher({ currentForm }: FormSwitcherProps) {
  switch (currentForm) {
    case "pendientes":
      return <Pendientes />;
    case "completados":
      return <Completados />;
    default:
      return <div>Select a form from the sidebar</div>;
  }
}
