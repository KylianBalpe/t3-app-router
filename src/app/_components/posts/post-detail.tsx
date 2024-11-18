"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleMore } from "lucide-react";
import { api } from "@/trpc/react";
import CommentItem from "../comment/comment-item";
import CreateComment from "../comment/comment-create";
import { LoadingSpinner } from "@/components/icon/loading";
import { useSession } from "next-auth/react";

export default function PostDetail({ postId }: { postId: number }) {
  const { data: session } = useSession();

  const { data: post } = api.post.getPostById.useQuery({ id: postId });
  const { data: comments, isPending: commentsLoading } =
    api.comment.getCommentsByPostId.useQuery(postId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-sm text-sm">
          <MessageCircleMore className="mr-1 h-5 w-5" />
          {commentsLoading ? <LoadingSpinner /> : <p>{comments?.length}</p>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {post?.author.firstName + " " + post?.author.lastName}
          </DialogTitle>
          <DialogDescription>{post?.author.username}</DialogDescription>
        </DialogHeader>
        <div className="p-4 pt-0">{post?.post}</div>
        <div className="flex w-full flex-col gap-1 border-t p-4">
          {comments?.length ? (
            <>
              {comments?.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              {session && <CreateComment postId={postId} />}
            </>
          ) : (
            session && <CreateComment postId={postId} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
