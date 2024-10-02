import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import UserSkeleton from "./_components/user-skeleton";
import SessionProvider from "@/components/provider/session-provider";
import UserPosts from "./_components/user-post";
import UserDetail from "./_components/user-detail";
export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  void api.user.getUser.prefetch(params.username);
  void api.post.getUserPosts.prefetch(params.username);

  return (
    <HydrateClient>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        <SessionProvider>
          <Suspense fallback={<UserSkeleton />}>
            <UserDetail username={params.username} />
          </Suspense>
          <UserPosts username={params.username} />
        </SessionProvider>
      </div>
    </HydrateClient>
  );
}
