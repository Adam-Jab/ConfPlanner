import sessionsData from "@/data/sessions.json";
import type { Session, Track } from "@/types/session";

export async function getSessions(): Promise<Session[]> {
  // Using a static JSON file; in real apps this could be an API/database.
  return sessionsData as Session[];
}

export async function getSessionById(id: string): Promise<Session | undefined> {
  const sessions = (await getSessions()) as Session[];
  return sessions.find((s) => s.id === id);
}

export async function getTracks(): Promise<Track[]> {
  const sessions = await getSessions();
  const set = new Set<Track>(sessions.map((s) => s.track));
  return Array.from(set).sort();
}
