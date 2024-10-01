"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import PostAction from "./post-action";

type PostType = {
  id: number;
  post: string;
  isPublic: boolean;
  isArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  authorId: string;
  author: {
    name: string | null;
    username: string | null;
  };
};

export default function PostCard({ post }: { post: PostType }) {
  // const post = api.post.getLatest.useSuspenseQuery();

  return (
    <Card className="relative w-full rounded-sm">
      <CardHeader>
        <CardTitle>{post.author.name}</CardTitle>
        <CardDescription>@{post.author.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.post}</p>
      </CardContent>
      <div className="absolute right-4 top-4">
        <PostAction />
      </div>
    </Card>
  );
}
