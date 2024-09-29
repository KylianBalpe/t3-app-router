"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpSchema } from "@/lib/schema/auth-schema";
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
import { signIn } from "next-auth/react";

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
    },
  });

  const registerMutation = api.auth.signUp.useMutation({
    onSuccess: () => {
      toast("Registration successful");
      setIsLoading(false);
    },
    onError: (error) => {
      toast(error.message || "Something went wrong. Please try again later");
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    await registerMutation.mutateAsync(values);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    router.push("/");
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                      <Input placeholder="Last Name (Optional)" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex flex-col gap-2 p-0">
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign up
              </Button>
              <div className="relative flex w-full items-center justify-center py-4">
                <Separator />
                <span className="absolute bg-background px-2 text-sm">
                  Already have an account?
                </span>
              </div>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
              >
                Sign in
              </Link>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
