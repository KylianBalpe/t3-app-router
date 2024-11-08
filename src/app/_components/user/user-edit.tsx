"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { editUsernameSchema } from "@/lib/schemas/user-schema";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function EditUsername() {
  const { data: session } = useSession();

  const trpc = api.useUtils();
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);

  const form = useForm<z.infer<typeof editUsernameSchema>>({
    resolver: zodResolver(editUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  React.useEffect(() => {
    if (session) {
      form.setValue("username", session.user.username);
    }

    if (dialogOpen === false) {
      form.reset();
    }
  }, [session, form, dialogOpen]);

  const updateUsernameMutation = api.user.updateUsername.useMutation({
    onSuccess: (data) => {
      setIsSubmit(false);
      toast("Username updated");
      form.reset();
      void trpc.user.invalidate();
      router.push(`/${data.username}`);
    },
    onError: (error) => {
      setIsSubmit(false);
      toast(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof editUsernameSchema>) {
    setIsSubmit(true);
    try {
      await updateUsernameMutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change Username
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription className="hidden">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 p-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your username"
                      {...field}
                      disabled={isSubmit}
                    />
                  </FormControl>
                  <FormDescription>Username cannot be empty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" isLoading={isSubmit}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
