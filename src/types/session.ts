export type Track = "Frontend" | "Backend" | "DevOps" | "AI";

export interface Session {
  id: string;
  title: string;
  speaker: string;
  track: Track;
  startTime: string; // ISO8601
  endTime: string; // ISO8601
  room: string;
  description: string;
}

export type TimeOfDay = "Morning" | "Afternoon" | "Evening";

export function getTimeOfDay(dateIso: string): TimeOfDay {
  // Use UTC to avoid client/server and locale time zone mismatches
  const hour = new Date(dateIso).getUTCHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}
