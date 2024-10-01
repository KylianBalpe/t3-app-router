"use client";

import { api } from "@/trpc/react";
import * as React from "react";
import UserPosts from "./user-post";
import UserDetail from "./user-detail";

export default function User({ username }: { username: string }) {
  const user = api.user.getUser.useSuspenseQuery(username)[0];

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }

  return (
    <>
      <UserDetail user={user} />
      <UserPosts id={user.id} />
    </>
  );
}
