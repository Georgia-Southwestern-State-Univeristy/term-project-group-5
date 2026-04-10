import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import AttributesPage from "./AttributesPage";

describe("AttributesPage Tests", () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /* Happy Path 1
     Loads attributes and renders them */
  it("renders attributes from backend", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { _id: "1", label: "Beach", type: "Feature" },
            { _id: "2", label: "Cheap", type: "Price" }
          ])
      })
    );

    render(
      <MemoryRouter>
        <AttributesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Beach")).toBeInTheDocument();
      expect(screen.getByText("Cheap")).toBeInTheDocument();
    });
  });

  /* Happy Path 2
     Submits selected attribute and calls search API */
  it("submits selected attribute and calls search API", async () => {
    global.fetch = vi.fn((url) => {
      if (url.includes("/attributes")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { _id: "1", label: "Beach", type: "Feature" }
            ])
        });
      }

      if (url.includes("/search")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ results: [] })
        });
      }
    });
    
localStorage.setItem("user", JSON.stringify({
  email: "test@test.com",
  token: "fake-token"
}));
    render(
      <MemoryRouter>
        <AttributesPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Feature"));

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      "1"
    );

    await userEvent.click(screen.getByRole("button", { name: /find my destination/i }));

    await waitFor(() => {
  expect(global.fetch).toHaveBeenLastCalledWith(
    "/api/search",
    expect.objectContaining({
      method: "POST"
    })
  );
});
  });

  /* 
     Failure Path
     Shows modal when no attribute selected */
  it("shows modal if no attribute selected", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(
      <MemoryRouter>
        <AttributesPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByRole("button", { name: /find my destination/i }));

    await userEvent.click(screen.getByRole("button", { name: /find my destination/i }));

    expect(
      screen.getByText(/You must select at least one attribute/i)
    ).toBeInTheDocument();
  });

  /* Boundary Test
     Handles empty attributes array*/
  it("renders page correctly when API returns empty array", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(
      <MemoryRouter>
        <AttributesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Search Preferences")
      ).toBeInTheDocument();
    });
  });

});