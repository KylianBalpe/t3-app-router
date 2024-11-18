"use client";

import PostCardDetail from "@/app/_components/posts/post-card-detail";
import { Spinner } from "@/components/icon/spinner";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DetailPostClientPage({ id }: { id: number }) {
  const { data: post, isPending } = api.post.getPostById.useQuery({ id: id });

  if (isPending) {
    return (
      <div className="flex h-16 w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-16 w-full items-center justify-center">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <Link href="/" className={buttonVariants({ variant: "neutral" })}>
          <ChevronLeft className="mr-2 size-4" />
          Back
        </Link>
        <PostCardDetail post={post} />
      </div>
    </div>
  );
}
