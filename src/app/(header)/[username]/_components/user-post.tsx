import React from "react";
import PostCard from "@/app/(header)/_components/post-card";
import { api } from "@/trpc/react";

export default function UserPosts({ id }: { id: string }) {
  const posts = api.post.getUserPosts.useSuspenseQuery(id)[0];

  if (posts.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <p>User has no posts</p>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <p>Post by {posts[0]?.author.name}</p>
      <div className="flex w-full flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
