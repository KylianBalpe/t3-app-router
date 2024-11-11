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
import { type PostType } from "./post-type";
// import PostDetail from "./post-detail";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

export default function PostCard({ post }: { post: PostType }) {
  const { data: session } = useSession();

  return (
    <Card className="relative w-full rounded-lg shadow-sm">
      <CardHeader className="space-y-1">
        <Link href={`/${post.author.username}`} className="hover:underline">
          <CardTitle>{post.author.name}</CardTitle>
        </Link>
        <CardDescription>@{post.author.username}</CardDescription>
      </CardHeader>
      <Link href={`/post/${post.id}`} className="cursor-default">
        <CardContent>
          <p>{post.post}</p>
        </CardContent>
      </Link>
      {session?.user.id === post.authorId && (
        <div className="absolute right-4 top-4">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-start p-2">
        <Link
          href={`/post/${post.id}`}
          className={buttonVariants({ variant: "ghost" })}
        >
          <MessageCircleMore className="mr-1 h-5 w-5" />
          <p>{post.comments.length}</p>
          <p className="ml-1">Comments</p>
        </Link>
        {/* <PostDetail postId={post.id} /> */}
      </CardFooter>
    </Card>
  );
}
