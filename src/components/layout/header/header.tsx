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
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <Triangle className="size-5 fill-foreground" />
        </Link>
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
