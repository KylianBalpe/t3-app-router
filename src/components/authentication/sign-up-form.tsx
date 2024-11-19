"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { CardFooter } from "@/components/ui/card";
import { signUpSchema } from "@/lib/schemas/user-schema";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import * as React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const registerMutation = api.user.signUp.useMutation({
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/");
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong. Please try again later",
      );
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
    setIsLoading(true);
    await registerMutation.mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
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
            Sign up
          </Button>
          <div className="relative flex w-full items-center justify-center py-4">
            <Separator />
            <span className="bg-accent absolute px-2 text-sm font-medium">
              Already have an account?
            </span>
          </div>
          <Link
            href="/sign-in"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Sign in
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
}
