"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { createCommentSchema } from "@/lib/schemas/comment-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function CreateComment({ postId }: { postId: number }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const trpc = api.useUtils();

  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      comment: "",
      postId: postId,
    },
  });

  const createCommentMutation = api.comment.create.useMutation({
    onSuccess: () => {
      toast("Comment created");
      form.reset();
      setIsLoading(false);
      void trpc.comment.invalidate();
      void trpc.post.invalidate();
    },
  });

  async function onSubmit(values: z.infer<typeof createCommentSchema>) {
    setIsLoading(true);
    await createCommentMutation.mutateAsync(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="inline-flex w-full items-center gap-2 p-0"
      >
        <FormField
          control={form.control}
          name="postId"
          render={({ field }) => (
            <FormItem className="hidden space-y-0">
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="m-0 w-full space-y-0">
              <FormControl>
                <Input
                  placeholder="Write your comment..."
                  className="w-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" variant="ghost" isLoading={isLoading}>
          <Send className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
