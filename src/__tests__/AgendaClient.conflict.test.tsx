import { renderWithProviders as render, screen } from "@/test/utils";
import AgendaClient from "@/components/AgendaClient";
import type { Session } from "@/types/session";

jest.mock("@/contexts/AgendaContext", () => {
  const actual = jest.requireActual("@/contexts/AgendaContext");
  return {
    ...actual,
    useAgenda: () => ({
      selectedIds: new Set(["a", "b"]),
      remove: jest.fn(),
      clear: jest.fn(),
      hydrated: true,
    }),
  };
});

const sessions: Session[] = [
  {
    id: "a",
    title: "Session A",
    speaker: "A",
    track: "Frontend",
    startTime: "2025-05-20T09:00:00.000Z",
    endTime: "2025-05-20T09:45:00.000Z",
    room: "A",
    description: "A",
  },
  {
    id: "b",
    title: "Session B",
    speaker: "B",
    track: "Frontend",
    startTime: "2025-05-20T09:30:00.000Z",
    endTime: "2025-05-20T10:15:00.000Z",
    room: "B",
    description: "B",
  },
];

describe("AgendaClient", () => {
  it("shows conflict warning when sessions overlap", () => {
    render(<AgendaClient allSessions={sessions} />);
    expect(screen.getByText(/warning/i)).toBeInTheDocument();
  });
});
