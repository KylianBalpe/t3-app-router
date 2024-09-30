import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Posts from "./_components/post/post";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();
  return (
    <HydrateClient>
      <div className="flex w-full flex-col items-center gap-4 p-4">
        {session && <p>Welcome back, {session.user.name}</p>}
        <Posts />
      </div>
    </HydrateClient>
  );
}
