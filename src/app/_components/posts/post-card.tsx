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
// import PostDetail from "./post-detail";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { type PostType } from "@/types/post-type";

export default function PostCard({ post }: { post: PostType }) {
  const { data: session } = useSession();

  const authorName = post.author.firstName + " " + post.author.lastName;

  return (
    <Card className="relative w-full bg-white dark:bg-secondaryBlack dark:text-darkText">
      <CardHeader className="space-y-0">
        <Link href={`/${post.author.username}`} className="hover:underline">
          <CardTitle>{authorName}</CardTitle>
        </Link>
        <CardDescription className="!mt-1 text-text/80 dark:text-darkText">
          @{post.author.username}
        </CardDescription>
      </CardHeader>
      <Link href={`/post/${post.id}`} className="cursor-default">
        <CardContent>
          <p className="whitespace-pre-line font-medium">{post.post}</p>
        </CardContent>
      </Link>
      {session?.user.id === post.authorId && (
        <div className="absolute right-6 top-6">
          <PostAction action={post} />
        </div>
      )}
      <CardFooter className="flex flex-row items-center justify-start">
        <Link
          href={`/post/${post.id}`}
          className={buttonVariants({
            variant: "noShadow",
            className:
              "cursor-default bg-secondaryBlack !text-darkText dark:bg-white dark:!text-text",
          })}
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
