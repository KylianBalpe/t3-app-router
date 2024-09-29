"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GitHubSignInButton() {
  return (
    <Button type="button" className="w-full" onClick={() => signIn("github")}>
      Sign in with GitHub
    </Button>
  );
}
