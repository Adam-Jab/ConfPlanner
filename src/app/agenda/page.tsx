import AgendaClient from "@/components/AgendaClient";
import { getSessions } from "@/lib/sessions";

export const metadata = {
  title: "My Agenda – Conference Session Planner",
};

export default async function AgendaPage() {
  const allSessions = await getSessions();
  return <AgendaClient allSessions={allSessions} />;
}
