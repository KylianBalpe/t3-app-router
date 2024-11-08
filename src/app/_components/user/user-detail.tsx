"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";
import EditUsername from "./user-edit";

export default function UserDetail({ username }: { username: string }) {
  const [user] = api.user.getUser.useSuspenseQuery(username);

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-36 w-36">
        <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
      <EditUsername />
    </div>
  );
}
