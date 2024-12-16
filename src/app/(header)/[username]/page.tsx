import { type Metadata } from "next";
import UserPageClient from "./client";
import { api } from "@/trpc/server";
import { env } from "@/env";

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await api.user.getUser(params.username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const description = `${fullName} profile on T3 App`;
  const baseUrl = env.NEXTAPP_URL;

  const encoded = Buffer.from(fullName).toString("base64");

  return {
    title: fullName,
    description: description,
    openGraph: {
      title: fullName,
      description: description,
      images: [
        {
          url: `${baseUrl}/api/og/user?name=${encoded}`,
          width: 1200,
          height: 630,
          alt: fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullName,
      description: description,
      images: [`${baseUrl}/api/og/user?name=${encoded}`],
    },
  };
}

export default async function UserPage({ params }: Props) {
  return <UserPageClient username={params.username} />;
}
