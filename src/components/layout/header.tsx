"use client";

import { Triangle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useSession } from "next-auth/react";

import { Button, buttonVariants } from "@/components/ui/button";
import ProfileDropDown from "@/components/layout/profile-dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 mx-auto my-4 h-16 w-full max-w-3xl bg-background px-4">
      <div className="inline-flex h-16 w-full items-center justify-between rounded-lg border px-4">
        <nav className="hidden flex-col text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link
            href="/"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
              className:
                "inline-flex w-full items-center p-0 hover:bg-transparent",
            })}
          >
            <Triangle className="mr-2 size-5 fill-foreground" />
            <p className="from-primary from-50% to-primary/40 bg-clip-text text-xl font-semibold dark:bg-gradient-to-b dark:text-transparent">
              T3 App
            </p>
          </Link>
        </nav>
        <Link href="/">
          <Triangle className="block size-8 fill-foreground sm:hidden" />
        </Link>
        <div className="inline-flex items-center space-x-2">
          {status === "authenticated" && session ? (
            <ProfileDropDown session={session} />
          ) : status === "loading" ? (
            <Button variant="outline" className="border-none p-5" isLoading />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
