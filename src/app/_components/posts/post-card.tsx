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
import { Button } from "@/components/ui/button";
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
      <CardContent>
        <Link href={`/post/${post.id}`} className="cursor-default">
          <p>{post.post}</p>
        </Link>
      </CardContent>
      {session?.user.id === post.authorId && (
        <div className="absolute right-4 top-4">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-end p-2">
        <Button
          size="sm"
          variant="ghost"
          className="cursor-default hover:bg-transparent"
          type="button"
        >
          <MessageCircleMore className="mr-1 h-5 w-5" />
          <p>{post.comments.length}</p>
        </Button>
        {/* <PostDetail postId={post.id} /> */}
      </CardFooter>
    </Card>
  );
}
