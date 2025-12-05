import { renderWithProviders as render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import SessionList from "@/components/SessionList";
import type { Session } from "@/types/session";

const sessions: Session[] = [
  {
    id: "a",
    title: "React Basics",
    speaker: "Alice",
    track: "Frontend",
    startTime: "2025-05-20T09:00:00.000Z",
    endTime: "2025-05-20T09:45:00.000Z",
    room: "A",
    description: "Intro",
  },
  {
    id: "b",
    title: "Node APIs",
    speaker: "Bob",
    track: "Backend",
    startTime: "2025-05-20T13:00:00.000Z",
    endTime: "2025-05-20T13:45:00.000Z",
    room: "B",
    description: "APIs",
  },
];

describe("SessionList", () => {
  it("filters by search query", async () => {
    render(<SessionList initialSessions={sessions} />);
    const input = screen.getByRole("searchbox", { name: /search/i });
    await userEvent.type(input, "react");
    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.queryByText("Node APIs")).not.toBeInTheDocument();
  });
});
