"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createPostSchema } from "@/lib/schemas/post-schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { socket } from "@/socket";

export default function CreatePost() {
  const [isLoading, setIsLoading] = React.useState(false);

  const trpc = api.useUtils();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      post: "",
    },
  });

  const createMutation = api.post.create.useMutation({
    onSuccess: (newPost) => {
      setIsLoading(false);
      toast.success("Post created");
      form.reset();
      void trpc.post.invalidate();

      socket.emit("post-new", newPost);
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error("Failed to create post");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    setIsLoading(true);
    await createMutation.mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-end space-y-3"
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormControl>
                <Textarea
                  placeholder="What do you think?"
                  rows={4}
                  className="w-full resize-none p-4"
                  {...field}
                />
              </FormControl>
              <FormMessage className="ml-2" />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" isLoading={isLoading}>
          Post
        </Button>
      </form>
    </Form>
  );
}
