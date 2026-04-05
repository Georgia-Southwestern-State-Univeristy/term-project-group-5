import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearchCard from "../components/FlightSearchCard";
import { vi } from "vitest";
import { AuthProvider } from "../context/authContext";
import { MemoryRouter} from "react-router-dom";
import * as AuthContext from "../context/authContext";


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

  renderWithProviders(<FlightSearchCard onSubmit={() => {}} />);

  const button = screen.getByText("Search");

  expect(button).toBeDisabled();
  expect(screen.getByText(/please sign in/i)).toBeInTheDocument();
});




test("search becomes disabled after logout", () => {
  let mockUser = { email: "test@example.com" };

  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: mockUser,
  }));

  const { rerender } = render(
    <MemoryRouter>
      <FlightSearchCard onSubmit={vi.fn()} />
    </MemoryRouter>
  );


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
    target: { value: "2026-03-20" },
  });


  expect(screen.getByText("Search")).not.toBeDisabled();

  // 👉 logout
  mockUser = null;

  rerender(
    <MemoryRouter>
      <FlightSearchCard onSubmit={vi.fn()} />
    </MemoryRouter>
  );


  expect(screen.getByText("Search")).toBeDisabled();
});