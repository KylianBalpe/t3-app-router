import { Header } from "@/components/layout/header";
import SessionProvider from "@/components/provider/session-provider";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Header />
        <main className="mx-auto max-w-xl">{children}</main>
      </SessionProvider>
    </>
  );
}
