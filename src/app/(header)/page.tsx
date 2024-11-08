import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Posts from "../_components/posts/post";
import React, { Suspense } from "react";
import CreatePost from "../_components/posts/post-create";
import { LoadingSpinner } from "@/components/icon/loading";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();
  return (
    <HydrateClient>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        {session && <CreatePost />}
        <Suspense fallback={<LoadingSpinner className="h-12 w-12" />}>
          <Posts />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
