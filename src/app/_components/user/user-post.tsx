"use client";

import * as React from "react";
import PostCard from "@/app/_components/posts/post-card";
import { api } from "@/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/icon/loading";

export default function UserPosts({ username }: { username: string }) {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: posts } = api.post.getUserPosts.useQuery(username, {
    enabled: isClient,
  });
  const { data: archived } = api.post.getUserArchivedPosts.useQuery(undefined, {
    enabled: isClient && session?.user.username === username,
  });

  if (!isClient || status === "loading") {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <LoadingSpinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="public" className="w-full">
      {session?.user.username === username && (
        <TabsList className="w-full">
          <TabsTrigger value="public" className="w-full">
            Public
          </TabsTrigger>
          <TabsTrigger value="archived" className="w-full">
            Archived
          </TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="public">
        <div className="flex w-full flex-col items-center gap-2">
          {posts?.length === 0 ? (
            <div className="flex h-80 w-full items-center justify-center">
              <p>No post yet</p>
            </div>
          ) : (
            posts?.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="flex w-full flex-col items-center gap-2">
          {archived?.length === 0 ? (
            <div className="flex h-80 w-full items-center justify-center">
              <p>No archived post</p>
            </div>
          ) : (
            archived?.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
