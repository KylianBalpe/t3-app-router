import { Header } from "@/components/layout/header";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl">{children}</main>
    </>
  );
}
