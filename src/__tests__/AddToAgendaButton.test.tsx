import { renderWithProviders as render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import AddToAgendaButton from "@/components/AddToAgendaButton";

describe("AddToAgendaButton", () => {
  it("toggles add/remove text", async () => {
    render(<AddToAgendaButton id="x" />);
    const btn = screen.getByRole("button", { name: /add to my agenda/i });
    await userEvent.click(btn);
    expect(screen.getByRole("button", { name: /remove from my agenda/i })).toBeInTheDocument();
  });
});
