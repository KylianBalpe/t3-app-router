"use client";

import * as React from "react";

import { api } from "@/trpc/react";
import PostCard from "./post-card";
import SessionProvider from "@/components/provider/session-provider";

export default function Posts() {
  const [posts] = api.post.getLatest.useSuspenseQuery();

  return (
    <SessionProvider>
      <div className="flex w-full flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </SessionProvider>
  );
}
