import { getSessionById } from "@/lib/sessions";
import type { Metadata } from "next";
import SessionDetails from "@/components/SessionDetails";
import SessionNotFound from "@/components/SessionNotFound";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SessionPage({ params }: Props) {
  const { id } = await params;
  const session = await getSessionById(id);
  if (!session) {
    return <SessionNotFound />;
  }
  return <SessionDetails session={session} />;
}
