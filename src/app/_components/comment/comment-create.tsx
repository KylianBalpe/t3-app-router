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
      toast.success("Comment created");
      form.reset();
      setIsLoading(false);
      void trpc.comment.invalidate();
      void trpc.post.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to create comment");
      setIsLoading(false);
      console.error(error);
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
                <div className="relative">
                  <Input
                    placeholder="Write your comment..."
                    className="h-full min-h-0 w-full resize-none !bg-white pr-11 !text-text placeholder:!text-text/60"
                    {...field}
                    autoComplete="off"
                  />
                  <div className="absolute right-0 top-0 flex items-center">
                    <Button
                      type="submit"
                      size="sm"
                      variant="noShadow"
                      className="border-none bg-transparent"
                      isLoading={isLoading}
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
