import SessionList from "@/components/SessionList";
import { getSessions } from "@/lib/sessions";

export default async function Home() {
  const sessions = await getSessions();
  return <SessionList initialSessions={sessions} />;
}
