"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <Button type="button" className="w-full" onClick={() => signIn("google")}>
      Sign in with Google
    </Button>
  );
}
