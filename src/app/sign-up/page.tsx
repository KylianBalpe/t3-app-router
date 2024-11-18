import SignUpForm from "@/components/authentication/sign-up-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up on T3 App",
};

export default function SignUpPage() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Return to home
      </Link>
    </main>
  );
}
