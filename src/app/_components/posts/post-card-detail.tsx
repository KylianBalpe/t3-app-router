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

export default function PostCardDetail({ post }: { post: PostType }) {
  const { data: session } = useSession();

  const { data: comments, isPending } =
    api.comment.getCommentsByPostId.useQuery(post.id);

  console.log(comments);

  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <Card className="relative w-full rounded-lg shadow-sm">
      <CardHeader className="space-y-1">
        <Link href={`/${post.author.username}`} className="hover:underline">
          <CardTitle>{authorName}</CardTitle>
        </Link>
        <CardDescription>@{post.author.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.post}</p>
      </CardContent>
      {session?.user.id === post.authorId && (
        <div className="absolute right-4 top-4">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-end p-4 py-2">
        <Button
          size="sm"
          variant="ghost"
          className="cursor-default hover:bg-transparent"
          type="button"
        >
          <MessageCircleMore className="mr-1 h-5 w-5" />
          <p>{post.comments.length} comments</p>
        </Button>
      </CardFooter>
      <div className="flex w-full flex-col gap-1 border-t p-6">
        {isPending && (
          <div className="flex w-full items-center justify-center">
            <LoadingSpinner className="size-6" />
          </div>
        )}
        {!isPending && comments!.length ? (
          <>
            {comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            {session && <CreateComment postId={post.id} />}
          </>
        ) : (
          session && <CreateComment postId={post.id} />
        )}
      </div>
    </Card>
  );
}
