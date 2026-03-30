import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test } from "vitest";
import { AuthProvider } from "../context/authContext";
import FlightSearchCard from "../components/FlightSearchCard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// wrapper component
const TestWrapper = () => {
  const navigate = useNavigate();

  return (
    <FlightSearchCard
     onSubmit={(formData) => {
        navigate(
            `/results?departure=${formData.departure}&destination=${formData.destination}`
        );
}}
    />
  );
};
// mock results page
const MockResultsPage = () => {
  const location = useLocation();   
  const query = new URLSearchParams(location.search);

  return (
    <div data-testid="results-page">
      <h1>Results Found</h1>
      <p>From: {query.get("departure")}</p>
      <p>To: {query.get("destination")}</p>
    </div>
  );
};

test("integration: authenticated user can search and navigate to results", async () => {
 
  const user = { email: "test@test.com", token: "abc123" };
  localStorage.setItem("user", JSON.stringify(user));

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
            <Route path="/" element={<TestWrapper />} />
            <Route path="/results" element={<MockResultsPage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  
  const inputs = screen.getAllByPlaceholderText("City or airport");

fireEvent.change(inputs[0], { target: { value: "ATL" } });
fireEvent.change(inputs[1], { target: { value: "LAX" } });
  fireEvent.change(screen.getByLabelText(/Departure Date/i), {
  target: { value: "2026-05-10" },
});

fireEvent.change(screen.getByLabelText(/Return Date/i), {
  target: { value: "2026-05-15" },
});
 
  fireEvent.click(screen.getByRole("button", { name: /search/i }));

  
  const resultsHeading = await screen.findByText("Results Found");
  expect(resultsHeading).toBeDefined();

  
  expect(screen.getByText("From: ATL")).toBeDefined();
  expect(screen.getByText("To: LAX")).toBeDefined();
});



test("should block flight search if user is not logged in", async () => {
  localStorage.removeItem("user");

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<FlightSearchCard />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

 
  const message = await screen.findByText(/please login/i);
  expect(message).toBeInTheDocument();
});