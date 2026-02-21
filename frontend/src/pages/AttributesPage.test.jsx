import { render, screen, waitFor } from "@testing-library/react";
import AttributesPage from "./AttributesPage";

// mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: "1", label: "Beach", type: "Feature" },
        { id: "2", label: "Cheap", type: "Price" }
      ])
  })
);

describe("AttributesPage Smoke Test", () => {
  it("renders without crashing and displays attributes", async () => {
    render(<AttributesPage />);

    // initially loading
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // wait for fetch
    await waitFor(() => {
      expect(screen.getByText("Beach")).toBeInTheDocument();
      expect(screen.getByText("Cheap")).toBeInTheDocument();
    });
  });
});