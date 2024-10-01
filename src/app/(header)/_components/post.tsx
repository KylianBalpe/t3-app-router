"use client";

import * as React from "react";

import { api } from "@/trpc/react";
import PostCard from "./post-card";

export default function Posts() {
  const posts = api.post.getLatest.useSuspenseQuery();

  const postData = posts[0];
  return (
    <div className="flex w-full flex-col gap-4">
      {postData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
