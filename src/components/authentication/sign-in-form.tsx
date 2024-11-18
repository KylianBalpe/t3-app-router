"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { CardFooter } from "@/components/ui/card";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schemas/user-schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";
import * as React from "react";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast(res.error);
        setIsLoading(false);
        return;
      }

      toast("Logged in successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast("Something went wrong. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="flex flex-col gap-2 p-0">
          <Button
            type="submit"
            variant="neutral"
            className="w-full"
            isLoading={isLoading}
          >
            Sign in
          </Button>
          <div className="relative flex w-full items-center justify-center py-4">
            <Separator />
            <span className="bg-mainAccent absolute px-2 text-sm">
              Don&apos;t have an account?
            </span>
          </div>
          <Link
            href="/sign-up"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Sign up
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
}
