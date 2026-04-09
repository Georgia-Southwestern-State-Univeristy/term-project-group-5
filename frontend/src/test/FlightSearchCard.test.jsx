import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearchCard from "../components/FlightSearchCard";
import { vi } from "vitest";
import { AuthProvider } from "../context/authContext";
import { MemoryRouter} from "react-router-dom";
import * as AuthContext from "../context/authContext";
import HomePage from "../pages/HomePage";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});
describe("FlightSearchCard - Component Behavior", () => {
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

});

describe("Flight Search Flow - Integration", () => {

test("search form data is passed to results page via URL", () => {
  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: { email: "test@test.com" },
  }));

  const history = createMemoryHistory();

    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <HomePage />
        </Router>
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
    target: { value: "2026-04-10" },
  });

  fireEvent.change(screen.getByLabelText("Return Date"), {
    target: { value: "2026-04-15" },
  });

  fireEvent.click(screen.getByText("Search"));


  expect(history.location.pathname).toBe("/results");
    expect(history.location.search).toContain("departure=ATL");
    expect(history.location.search).toContain("destination=NYC");
});


});