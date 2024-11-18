"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import PostAction from "./post-action";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { type PostType } from "@/types/post-type";
// import PostDetail from "./post-detail";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { api } from "@/trpc/react";
import CommentItem from "../comment/comment-item";
import CreateComment from "../comment/comment-create";
import { LoadingSpinner } from "@/components/icon/loading";
import { Spinner } from "@/components/icon/spinner";
import { cn } from "@/lib/utils";

export default function PostCardDetail({ post }: { post: PostType }) {
  const { data: session } = useSession();

  const { data: comments, isPending } =
    api.comment.getCommentsByPostId.useQuery(post.id);

  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <Card className="dark:text-darkText dark:bg-secondaryBlack relative w-full bg-white">
      <CardHeader className="space-y-0">
        <Link href={`/${post.author.username}`} className="hover:underline">
          <CardTitle>{authorName}</CardTitle>
        </Link>
        <CardDescription className="text-text/80 dark:text-darkText !mt-1">
          @{post.author.username}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{post.post}</p>
      </CardContent>
      {session?.user.id === post.authorId && (
        <div className="absolute right-6 top-6">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-end">
        <Button
          size="sm"
          variant="noShadow"
          className="dark:text-text bg-secondaryBlack text-darkText cursor-default dark:bg-white"
          type="button"
        >
          <MessageCircleMore className="mr-1 h-5 w-5" />
          <p>{post.comments.length} comments</p>
        </Button>
      </CardFooter>
      {isPending && (
        <div className="flex w-full flex-col items-center justify-center gap-4 border-t p-6">
          <Spinner />
        </div>
      )}
      {comments && (
        <div
          className={cn(
            "flex w-full flex-col gap-4 border-t p-6",
            comments.length < 1 && "hidden",
            session && "flex",
          )}
        >
          <div className={cn("flex flex-col", comments.length < 1 && "hidden")}>
            {comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
          {session && <CreateComment postId={post.id} />}
        </div>
      )}
    </Card>
  );
}
