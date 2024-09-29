"use client";

import { Triangle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useSession } from "next-auth/react";

import { Button, buttonVariants } from "@/components/ui/button";
import ProfileDropDown from "@/components/layout/header/profile-dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="absolute top-0 flex h-16 w-full flex-row items-center justify-between gap-4 border-b bg-background px-12">
      <nav className="hidden flex-col gap-2 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
        <Link
          href="/"
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "p-0 hover:bg-transparent",
          })}
        >
          <Triangle className="size-5 fill-foreground" />
        </Link>
        <p className="from-primary from-50% to-primary/40 bg-clip-text text-xl font-semibold dark:bg-gradient-to-b dark:text-transparent">
          T3 App
        </p>
      </nav>
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
    </header>
  );
};
