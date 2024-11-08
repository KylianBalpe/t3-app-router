"use client";

import PostCardDetail from "@/app/_components/posts/post-card-detail";
import { LoadingSpinner } from "@/components/icon/loading";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DetailPostPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id);

  const { data: post, isPending } = api.post.getPostById.useQuery(postId, {
    enabled: !!postId,
  });

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      {isPending && <LoadingSpinner className="size-8" />}
      {!isPending && post && (
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            <ChevronLeft className="mr-2 size-4" />
            Back
          </Link>
          <PostCardDetail post={post} />
        </div>
      )}
    </div>
  );
}
