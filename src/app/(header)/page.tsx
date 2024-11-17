import { getServerAuthSession } from "@/server/auth";
import Posts from "../_components/posts/post";
import CreatePost from "../_components/posts/post-create";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      {session && <CreatePost />}
      <Posts />
    </div>
  );
}
