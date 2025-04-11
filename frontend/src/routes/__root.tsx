import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-row gap-2 p-4  bg-gradient-to-b from-blue-100 to-blue-200 justify-center">
        <Link to="/" className="[&.active]:font-bold">
          Pacientes
        </Link>
        <Link to="/examenes" className="[&.active]:font-bold">
          Examenes
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
