import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearchCard from "../components/FlightSearchCard";
import { vi } from "vitest";

test("shows error when departure or destination is empty", () => {
  render(<FlightSearchCard onSubmit={() => {}} />);

  fireEvent.click(screen.getByText("Search"));

  expect(
    screen.getByText("Departure and Destination are required.")
  ).toBeInTheDocument();
});
test("shows error when return date is before departure date", () => {
  render(<FlightSearchCard onSubmit={() => {}} />);

  const inputs = screen.getAllByPlaceholderText("City or airport");

  fireEvent.change(inputs[0], {
    target: { value: "ATL" },
  });

  fireEvent.change(inputs[1], {
    target: { value: "NYC" },
  });

  fireEvent.change(screen.getByLabelText("Departure Date"), {
    target: { value: "2026-03-10" },
  });

  fireEvent.change(screen.getByLabelText("Return Date"), {
    target: { value: "2026-03-01" },
  });


  fireEvent.click(screen.getByText("Search"));

  expect(
    screen.getByText("Return date must be after departure date.")
  ).toBeInTheDocument();
});
test("calls onSubmit when form is valid", () => {
  const mockSubmit = vi.fn();

  render(<FlightSearchCard onSubmit={mockSubmit} />);

  const inputs = screen.getAllByPlaceholderText("City or airport");

  fireEvent.change(inputs[0], {
    target: { value: "ATL" },
  });

  fireEvent.change(inputs[1], {
    target: { value: "NYC" },
  });

  fireEvent.click(screen.getByText("Search"));

  expect(mockSubmit).toHaveBeenCalled();
});
test("does not submit when validation fails", () => {
  

const mockSubmit = vi.fn();

  render(<FlightSearchCard onSubmit={mockSubmit} />);

  fireEvent.click(screen.getByText("Search"));

  expect(mockSubmit).not.toHaveBeenCalled();
});
