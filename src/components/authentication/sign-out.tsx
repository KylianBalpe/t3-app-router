"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Sign out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-md space-y-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="p-2 text-center text-3xl font-bold">
            Are you sure you want to sign out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-center sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => signOut()} variant="destructive">
              Sign out
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
