# Week 12 – Beta Quality Summary

## 1. Test Coverage Overview

Our automated tests are categorized as follows:

### Unit / Component Tests
| Component            | Tests |
|---------------------|------|
| FlightSearchCard     | 6    |
| AttributesPage       | 4    |
| **Total**            | **10** |

These tests focus on isolated frontend component behavior, including:
- FlightSearchCard validation logic
- Search button enabled/disabled behavior based on authentication state
- Submission behavior when the form is valid or invalid
- AttributesPage rendering

---

### Integration Tests
| Layer      | Tests |
|------------|------|
| Frontend   | 2    |
| Backend    | 10    |
| **Total**  | **12** |

Total Integration Tests: 12

These tests verify interactions across multiple components:

- UI → navigation → results flow
- Authentication-protected API endpoints
- Request validation and error handling
- Backend logic and database interaction

---

### End-to-End (E2E) Tests
    | Test File              | Count |
|-----------------------|------|
| `flight.e2e.test.js`  | 1    |


This test simulates a complete system workflow and validates real-world API behavior.

---

### Total Tests
- 23

---

## 2. Core Workflows Covered

Our automated tests focus on protecting key user workflows across both frontend and backend layers, ensuring that critical functionality behaves correctly under real-world conditions.

The following core workflows are covered:

- **User Authentication Flow**
  - User registration with valid credentials  
  - Prevention of duplicate account creation  
  - Successful and failed login attempts (authorized vs unauthorized)

- **Protected API Access**
  - Enforcement of authentication for protected endpoints (e.g., `/api/flights/search`)  
  - Rejection of requests without valid tokens  

- **Flight Search Workflow**
  - Submission of valid flight search requests  
  - End-to-end handling of search requests through backend services  
  - Validation of response structure (price, itinerary fields)

- **Input Validation and Error Handling**
  - Rejection of invalid or incomplete input (e.g., missing fields, invalid IDs)  
  - Proper HTTP status responses (400, 401) for invalid requests  

- **Frontend User Interaction**
  - Form validation behavior in FlightSearchCard  
  - Prevention of submission when required fields are missing or invalid  
  - Correct triggering of submission logic when inputs are valid  

These workflows represent the primary user journeys in the system. By testing them end-to-end and across layers, we ensure that the application remains functional, secure, and reliable as new changes are introduced.

---

## 3. CI Evidence

All pull requests are validated through our CI/CD pipeline, which ensures that builds succeed and all tests pass before merging.

Latest passing CI run:  
👉 https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/23858300533

The CI pipeline includes:
- Dependency installation  
- Build verification  
- Automated test execution (frontend + backend)  

---

## 4. Important Gaps in Testing

While the current test suite provides strong coverage of core workflows, several gaps remain that should be addressed in future iterations:

- Limited full end-to-end testing across the complete frontend-to-backend user journey  
- No performance or load testing implemented yet  
- External flight API integrations are not fully tested in real-world scenarios  
- Some UI edge cases (e.g., dropdown interactions, user session transitions) are not fully covered  

---

## 5. Additional Tests Added This Week

To improve Beta confidence, we added tests focusing on authentication-related user workflows:

- Verified that flight search is blocked when the user is not logged in  

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

- Verified that search functionality is disabled after logout and UI state updates accordingly  

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
These tests ensure that authentication state changes are consistently enforced across components and prevent unauthorized actions in the user interface.

## 6. Regression Protection

### Regression Protection

A critical bug was identified where users were still able to interact with the flight search functionality after logging out.

To fix this issue:
- The UI was updated to disable the search button when the user is not authenticated.
- The submission logic was also guarded to prevent any request from being triggered without a valid user.

To prevent regression, additional tests were added:
- A test to verify that the search button is disabled when the user is not logged in.
- A test to ensure that form submission is not triggered when the user is unauthenticated.
- A test to confirm that the UI correctly updates after logout and disables the search functionality.

These tests ensure that both the UI layer and business logic remain protected against unauthorized access in future changes.
