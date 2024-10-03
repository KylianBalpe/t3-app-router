import React from "react";
import { type CommentType } from "../posts/post-type";

interface CommentProp extends CommentType {
  author: {
    name: string | null;
    username: string | null;
  };
}

export default function CommentItem({ comment }: { comment: CommentProp }) {
  return (
    <div key={comment.id} className="inline-flex items-center gap-1 text-sm">
      <p className="font-bold">{comment.author.name}</p>
      <p>{comment.comment}</p>
    </div>
  );
}
