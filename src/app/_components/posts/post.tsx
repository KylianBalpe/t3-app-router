"use client";

import * as React from "react";

import { api } from "@/trpc/react";
import PostCard from "./post-card";
import { socket } from "@/socket";
import { type PostType } from "@/types/post-type";
import { Spinner } from "@/components/icon/spinner";

export default function Posts() {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const { data: latestPosts, isPending: postLoading } =
    api.post.getLatest.useQuery();

  React.useEffect(() => {
    if (latestPosts) {
      setPosts(latestPosts);
    }
  }, [latestPosts]);

  React.useEffect(() => {
    const handleNewPost = (newPost: PostType) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const handleArchivedPost = (archivedPost: PostType) => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== archivedPost.id),
      );
    };

    const handleUnarchivePost = (unarchivedPost: PostType) => {
      setPosts((prevPosts) => [unarchivedPost, ...prevPosts]);
    };

    const handleDeletePost = (deletedPost: PostType) => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletedPost.id),
      );
    };

    socket.on("post-new", handleNewPost);
    socket.on("post-archived", handleArchivedPost);
    socket.on("post-unarchived", handleUnarchivePost);
    socket.on("post-deleted", handleDeletePost);

    return () => {
      socket.off("post-new", handleNewPost);
      socket.off("post-archived", handleArchivedPost);
      socket.off("post-unarchived", handleUnarchivePost);
      socket.off("post-deleted", handleDeletePost);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      {postLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner className="size-8" />
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
