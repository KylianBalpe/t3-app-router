import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { redirect, RedirectType } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import GitHubSignInButton from "@/components/authentication/github-signin";
import GoogleSignInButton from "@/components/authentication/google-signin";

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
          <CardDescription>Chose a provider to sign in with</CardDescription>
        </CardHeader>
        <CardContent>
          <GitHubSignInButton />
          <div className="relative flex w-full items-center justify-center py-4">
            <Separator />
            <span className="absolute bg-background px-2 text-sm">OR</span>
          </div>
          <GoogleSignInButton />
        </CardContent>
      </Card>
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Return to home
      </Link>
    </main>
  );
}
