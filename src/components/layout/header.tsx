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
    <header className="sticky top-0 z-40 mx-auto mb-4 h-16 w-full max-w-3xl px-4 pt-4">
      <div className="bg-mainAccent dark:border-darkBorder shadow-light dark:shadow-dark rounded-base inline-flex h-16 w-full items-center justify-between border-2 border-border px-6">
        <nav className="hidden flex-col text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link
            href="/"
            className={buttonVariants({
              size: "icon",
              variant: "noShadow",
              className:
                "inline-flex w-full items-center border-none bg-transparent p-0 hover:bg-transparent",
            })}
          >
            <Triangle className="fill-text mr-2 size-5" />
            <p className="text-text text-xl font-semibold">T3 App</p>
          </Link>
        </nav>
        <Link href="/">
          <Triangle className="fill-text size-8 sm:hidden" />
        </Link>
        <div className="inline-flex items-center space-x-2">
          <ThemeToggle />
          {status === "authenticated" && session ? (
            <ProfileDropDown session={session} />
          ) : status === "loading" ? (
            <>
              <Button size="sm" isLoading>
                Sign in
              </Button>
              <Button size="sm" isLoading>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
                Sign in
              </Link>
              <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
