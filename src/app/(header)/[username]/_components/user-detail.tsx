"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserType = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
};

export default function UserDetail({ user }: { user: UserType }) {
  return (
    <div className="flex flex-col gap-4">
      <Avatar className="h-36 w-36">
        <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
}
