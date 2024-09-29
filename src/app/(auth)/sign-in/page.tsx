import SignInForm from "@/components/authentication/sign-in";
import { buttonVariants } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <SignInForm />
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Return to home
      </Link>
    </main>
  );
}
