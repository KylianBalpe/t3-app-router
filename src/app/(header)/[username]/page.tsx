import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
import User from "@/app/(header)/[username]/_components/user";

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
  return (
    <HydrateClient>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        <User username={params.username} />
      </div>
    </HydrateClient>
  );
}
