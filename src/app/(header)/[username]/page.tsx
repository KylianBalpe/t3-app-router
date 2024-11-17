import { type Metadata } from "next";
import UserPageClient from "./client";
import { api } from "@/trpc/server";

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

  return {
    title: user.name,
    description: user.name + " Profile on T3 App",
  };
}

export default async function UserPage({ params }: Props) {
  return <UserPageClient username={params.username} />;
}
