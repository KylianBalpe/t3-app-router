"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-primary group-[.toaster]:text-text group-[.toaster]:border-base !border-border border-2 group-[.toaster]:shadow-dark inline-flex items-center pl-6 text-base",
          description: "group-[.toast]:text-text",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-text",
          cancelButton: "group-[.toast]:bg-primary group-[.toast]:text-text",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
