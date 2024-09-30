import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }
  return <div>UserPage</div>;
}
