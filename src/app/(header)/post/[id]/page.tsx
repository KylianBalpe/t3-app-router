import { type Metadata } from "next";
import DetailPostClientPage from "./client";
import { api } from "@/trpc/server";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.post.getPostById(Number(params.id));

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const truncatedPost =
    post.post.length > 16 ? `${post.post.substring(0, 16)}...` : post.post;

  return {
    title: truncatedPost + " - " + post.author.name,
    description: post.author.name + " on T3 App",
  };
}

export default function DetailPostPage({ params }: Props) {
  const postId = Number(params.id);

  return <DetailPostClientPage id={postId} />;
}
