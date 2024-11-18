import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import SignInForm from "@/components/authentication/sign-in-form";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/", RedirectType.push);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <Link
        href="/"
        className={buttonVariants({
          variant: "reverse",
        })}
      >
        Return to home
      </Link>
    </main>
  );
}
