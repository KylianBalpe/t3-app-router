"use client";

import Posts from "../_components/posts/post";
import CreatePost from "../_components/posts/post-create";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/icon/loading";
import useSocket from "@/hooks/useSocket";

export default function Home() {
  const { data: session, status } = useSession();
  const { connected, transport } = useSocket();

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      <div className="inline-flex gap-4">
        <p>Status: {connected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
      </div>
      {status === "loading" && <LoadingSpinner className="size-8" />}
      {session && <CreatePost />}
      {status !== "loading" && <Posts />}
    </div>
  );
}
