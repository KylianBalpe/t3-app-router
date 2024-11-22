import React from "react";
import { type CommentType } from "@/types/comment-type";

interface CommentProp extends CommentType {
  author: {
    firstName: string;
    lastName: string;
  };
}

export default function CommentItem({ comment }: { comment: CommentProp }) {
  const authorName = comment.author.firstName + " " + comment.author.lastName;
  return (
    <div
      key={comment.id}
      className="flex flex-row flex-wrap items-center gap-1 text-base"
    >
      <p className="font-bold">{authorName}</p>
      <p className="text-text/80 dark:text-darkText/80">{comment.comment}</p>
    </div>
  );
}
