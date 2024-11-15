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
    <header className="sticky top-0 z-40 flex h-16 w-full flex-row items-center justify-between gap-4 border-b bg-background px-4 sm:px-12">
      <div className="mx-auto inline-flex w-full max-w-3xl justify-between px-6">
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
        <Triangle className="block size-8 fill-foreground sm:hidden" />
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
