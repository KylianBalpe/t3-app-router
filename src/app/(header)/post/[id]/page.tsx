import { type Metadata } from "next";
import DetailPostClientPage from "./client";
import { api } from "@/trpc/server";
import { env } from "@/env";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.post.getPostById({ id: Number(params.id) });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const truncatedPost =
    post.post.length > 16 ? `${post.post.substring(0, 16)}...` : post.post;

  const title =
    truncatedPost + " - " + post.author.firstName + " " + post.author.lastName;
  const desc =
    post.author.firstName + " " + post.author.lastName + " on T3 App";

  const baseUrl = env.NEXTAPP_URL;

  const encoded = Buffer.from(truncatedPost).toString("base64");

  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images: [
        {
          url: `${baseUrl}/api/og/post?post=${encoded}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: desc,
      images: [`${baseUrl}/api/og/post?post=${encoded}`],
    },
  };
}

export default function DetailPostPage({ params }: Props) {
  const postId = Number(params.id);

  return <DetailPostClientPage id={postId} />;
}
