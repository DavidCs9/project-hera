import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="w-full text-center flex flex-row justify-between px-8 py-2  bg-gradient-to-b from-blue-100 to-blue-200 items-center">
        <h1 className="text-2xl font-bold">Project Hera</h1>
        <div className="flex flex-row gap-2  justify-center">
          <Link to="/" className="[&.active]:font-bold">
            Pacientes
          </Link>
          <Link to="/examenes" className="[&.active]:font-bold">
            Examenes
          </Link>
        </div>
      </header>
      <hr />
      <Outlet />
      <footer className="py-3 text-center text-sm text-muted-foreground absolute bottom-0  left-[50%] translate-x-[-50%]">
        Made with ❤️ by David Castro • 2025
      </footer>
      <TanStackRouterDevtools />
    </>
  ),
});
