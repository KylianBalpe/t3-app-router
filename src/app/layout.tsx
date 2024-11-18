import "@/styles/globals.css";

import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { HydrateClient } from "@/trpc/server";
import SessionProvider from "@/components/provider/session-provider";
import { CheckCircleIcon } from "lucide-react";
import { Archivo } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s - T3 App",
    default: "T3 App",
  },
  description: "T3 App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.className}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <HydrateClient>
              <SessionProvider>{children}</SessionProvider>
            </HydrateClient>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster
          position="top-center"
          icons={{
            success: <CheckCircleIcon className="size-5" />,
          }}
          richColors
        />
      </body>
    </html>
  );
}
