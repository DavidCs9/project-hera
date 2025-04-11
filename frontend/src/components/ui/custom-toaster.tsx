import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-800 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600",
          actionButton: "group-[.toast]:bg-cyan-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700",
          success:
            "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-blue-50 group-[.toaster]:to-cyan-50 group-[.toaster]:border-blue-200/30",
          error:
            "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-red-50 group-[.toaster]:to-pink-50 group-[.toaster]:border-red-200/30",
          info: "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-blue-50 group-[.toaster]:to-indigo-50 group-[.toaster]:border-blue-200/30",
        },
      }}
      position="top-right"
      expand={true}
      closeButton={true}
      richColors={true}
      duration={4000}
    />
  );
}
