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
import PostDetail from "./post-detail";

export default function PostCard({ post }: { post: PostType }) {
  const { data } = useSession();

  return (
    <Card className="relative w-full rounded-sm">
      <CardHeader className="space-y-1">
        <Link href={`/${post.author.username}`} className="hover:underline">
          <CardTitle>{post.author.name}</CardTitle>
        </Link>
        <CardDescription>@{post.author.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.post}</p>
      </CardContent>
      {data?.user.id === post.authorId && (
        <div className="absolute right-4 top-4">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-end p-2">
        <PostDetail postId={post.id} />
      </CardFooter>
    </Card>
  );
}
