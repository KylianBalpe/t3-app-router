import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="from-primary from-50% to-primary/40 bg-clip-text text-4xl font-extrabold dark:bg-gradient-to-b dark:text-transparent lg:text-7xl">
          Create T3 App
        </h1>
        {session && <p>Welcome back, {session.user.name}</p>}
      </main>
    </HydrateClient>
  );
}
