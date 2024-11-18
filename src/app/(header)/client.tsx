"use client";

import { useSession } from "next-auth/react";
import Posts from "../_components/posts/post";
import CreatePost from "../_components/posts/post-create";

export default function HomeClient() {
  const { data: session } = useSession();

  return (
    <>
      {session && <CreatePost />}
      <Posts />
    </>
  );
}
