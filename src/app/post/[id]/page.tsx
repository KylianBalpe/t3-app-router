"use client";

export default function DetailPostPage({ params }: { params: { id: number } }) {
  const postId = params.id;
  return <div>postId:{postId}</div>;
}
