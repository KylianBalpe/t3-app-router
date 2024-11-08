"use client";

import UserPosts from "../../_components/user/user-post";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditUsername from "@/app/_components/user/user-edit";
import UserSkeleton from "@/app/_components/user/user-skeleton";
import { redirect } from "next/navigation";
export default function UserPage({ params }: { params: { username: string } }) {
  const { data: session, status } = useSession();

  if (!session && status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      {status === "loading" && <UserSkeleton />}
      {status === "authenticated" && session && (
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-36 w-36">
            <AvatarImage
              src={session.user.image ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
            <p className="text-muted-foreground">@{session.user.username}</p>
          </div>
          <EditUsername />
        </div>
      )}

      <UserPosts username={params.username} />
    </div>
  );
}
