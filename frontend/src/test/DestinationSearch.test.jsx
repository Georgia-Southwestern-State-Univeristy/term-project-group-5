
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import * as AuthContext from "../context/authContext";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";

test("redirects to login when not logged in and clicking Start Here", () => {
  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: null,
  }));

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /start here/i }));

  expect(screen.getByText("Login Page")).toBeInTheDocument();
});


test("redirects to attributes when logged in and clicking Start Here", () => {
  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: { email: "test@test.com" },
  }));

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attributes" element={<div>Attributes Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /start here/i }));

  expect(screen.getByText("Attributes Page")).toBeInTheDocument();
});

test("after logout, Start Here redirects to login instead of attributes", () => {
  let mockUser = { email: "test@test.com" };

  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: mockUser,
  }));

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/attributes" element={<div>Attributes Page</div>} />
        </Routes>
      </MemoryRouter>
    );


  renderApp();

  fireEvent.click(screen.getByRole("button", { name: /start here/i }));
  expect(screen.getByText("Attributes Page")).toBeInTheDocument();

  // 🔄 logout
  mockUser = null;


  renderApp();

  fireEvent.click(screen.getByRole("button", { name: /start here/i }));
  expect(screen.getByText("Login Page")).toBeInTheDocument();
});



test("Start Here navigation updates immediately on logout and login", () => {
  let mockUser = { email: "test@test.com" };

  vi.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
    user: mockUser,
  }));

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/attributes" element={<div>Attributes Page</div>} />
        </Routes>
      </MemoryRouter>
    );


  cleanup();
  renderApp();
  fireEvent.click(screen.getByRole("button", { name: /start here/i }));
  expect(screen.getByText("Attributes Page")).toBeInTheDocument();

  // 🔄 logout
  mockUser = null;

  cleanup();
  renderApp();
  fireEvent.click(screen.getByRole("button", { name: /start here/i }));
  expect(screen.getByText("Login Page")).toBeInTheDocument();

  // 🔄 login again
  mockUser = { email: "test@test.com" };

  cleanup();
  renderApp();
  fireEvent.click(screen.getByRole("button", { name: /start here/i }));
  expect(screen.getByText("Attributes Page")).toBeInTheDocument();
});