"use client";

import Posts from "../_components/posts/post";
import CreatePost from "../_components/posts/post-create";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/icon/loading";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      {status === "loading" && <LoadingSpinner className="size-8" />}
      {session && <CreatePost />}
      {status !== "loading" && <Posts />}
    </div>
  );
}
