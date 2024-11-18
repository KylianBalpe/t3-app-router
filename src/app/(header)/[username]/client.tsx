"use client";

import UserPosts from "../../_components/user/user-post";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditUsername from "@/app/_components/user/user-edit";
import UserSkeleton from "@/app/_components/user/user-skeleton";
import { api } from "@/trpc/react";

export default function UserPageClient({ username }: { username: string }) {
  const { data: session, status } = useSession();

  const { data: user, isPending } = api.user.getUser.useQuery(username);

  return (
    <div className="flex w-full flex-col items-center gap-6 p-4">
      {status === "loading" || (isPending && <UserSkeleton />)}
      {user && (
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-36 w-36">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-0">
            <h1 className="text-2xl font-bold">
              {user.firstName + " " + user.lastName}
            </h1>
            <p className="font-medium">@{user.username}</p>
          </div>
          {user.username === session?.user?.username && <EditUsername />}
        </div>
      )}
      <UserPosts username={username} />
    </div>
  );
}
