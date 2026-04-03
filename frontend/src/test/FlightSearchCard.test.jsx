import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearchCard from "../components/FlightSearchCard";
import { vi } from "vitest";
import { AuthProvider } from "../context/authContext";
import { MemoryRouter} from "react-router-dom";

test("shows error when departure or destination is empty", () => {
  const user = { email: 'test@test.com', token: 'fake-token' };
  localStorage.setItem('user', JSON.stringify(user));
  render(
  <AuthProvider>
    <MemoryRouter>
      <FlightSearchCard onSubmit={() => {}} />
    </MemoryRouter>
  </AuthProvider>);

  fireEvent.click(screen.getByText("Search"));

  expect(
    screen.getByText("Departure and Destination are required.")
  ).toBeInTheDocument();
});
test("shows error when return date is before departure date", () => {
  const user = { email: 'test@test.com', token: 'fake-token' };
  localStorage.setItem('user', JSON.stringify(user));
  render(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={() => {}} />
      </MemoryRouter>
    </AuthProvider>);
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
  const user = { email: 'test@test.com', token: 'fake-token' };
  localStorage.setItem('user', JSON.stringify(user));

  render(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={mockSubmit} />
      </MemoryRouter>
    </AuthProvider>
  );

  const inputs = screen.getAllByPlaceholderText("City or airport");

  fireEvent.change(inputs[0], {
    target: { value: "ATL" },
  });

  fireEvent.change(inputs[1], {
    target: { value: "NYC" },
  });

  fireEvent.change(screen.getByLabelText("Departure Date"), {
    target: { value: "2026-03-28" },
  });

  fireEvent.change(screen.getByLabelText("Return Date"), {
    target: { value: "2026-03-30" },
  });


  fireEvent.click(screen.getByText("Search"));

  expect(mockSubmit).toHaveBeenCalled();
});


test("does not submit when user is not logged in", () => {
  localStorage.removeItem("user");

  const mockSubmit = vi.fn();

  render(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={mockSubmit} />
      </MemoryRouter>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText("Search"));

  expect(mockSubmit).not.toHaveBeenCalled();
});

test("search button is disabled when user is not logged in", () => {
  localStorage.removeItem("user");

  render(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={() => {}} />
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText("Search")).toBeDisabled();
});



test("search becomes disabled after logout", () => {

  const user = { email: "test@test.com" };
  localStorage.setItem("user", JSON.stringify(user));

  const { rerender } = render(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={() => {}} />
      </MemoryRouter>
    </AuthProvider>
  );

 
  expect(screen.getByText("Search")).not.toBeDisabled();


  localStorage.removeItem("user");

 
  rerender(
    <AuthProvider>
      <MemoryRouter>
        <FlightSearchCard onSubmit={() => {}} />
      </MemoryRouter>
    </AuthProvider>
  );


  expect(screen.getByText("Search")).toBeDisabled();
});