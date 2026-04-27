# Week 15 — Final QA Checklist & Demo Path Verification

---

## 1. QA Checklist

The following checks were performed to validate system readiness:

### Startup / Deployment

1. System starts successfully using Docker (`docker compose up --build`)
2. Frontend accessible at http://localhost:5173
3. Backend accessible at http://localhost:5001
4. MongoDB connection established successfully (verified via logs)

---

### Authentication / Access

5. User can register successfully
6. User can log in and receive a valid token
7. Unauthorized access to protected features is prevented:
   - Frontend redirects unauthenticated users to login page
   - Backend still enforces authentication and returns 401 if accessed directly via API

---

### Core Workflow

8. User can search destinations using attribute selection
9. User can perform flight search with valid inputs
10. Flight results are returned and displayed correctly
11. Flight search parameters persist via URL on page refresh
12. Saved flights can be retrieved for authenticated users
13. Users can compare saved flights to evaluate price, duration, and stops

---

### Error Handling

14. Invalid flight search input is prevented at the frontend (form validation)
15. Backend validation exists to reject invalid requests if frontend validation is bypassed
16. External API failures are handled gracefully:
    - Backend returns a controlled error response
    - Frontend displays a user-friendly error message
    - Behavior verified through testing and simulation (not dependent on live API failure)

---

### UI / Usability

17. Search form validation prevents invalid submissions
18. Navigation between pages works correctly
19. Results page renders consistently
20. No major UI blocking issues observed

---

## 2. Demo Path (Final Presentation Flow)

The following is the exact demo flow planned for final presentation:

1. Start the system using Docker
2. Open frontend application
3. Register a new user account
4. Log in with the created account
5. Navigate to destination search
6. Select user preferences and generate destination suggestions
7. Select a destination and trigger flight search
8. Display flight results
9. Navigate to saved flights page
10. Select multiple saved flights and demonstrate comparison feature
11. Log out and attempt to access protected features
12. Show authentication enforcement (automatic redirect to login page)

---

## 3. Rehearsal Results

### What Worked Well

- System successfully started and ran in Docker environment
- Core workflows (login → search → results) executed without errors
- Frontend and backend integration worked correctly
- Query parameters persisted across page refresh
- Authentication and protected routes behaved as expected

---

### What Required Attention During Rehearsal

- External API response time may vary depending on network conditions
- Ensuring query parameters are consistently preserved across navigation
- Verifying authentication behavior for both logged-in and logged-out states

---

### Adjustments and Improvements

- Verified frontend validation prevents invalid input before submission
- Confirmed backend validation handles incorrect or missing data safely
- Ensed consistent navigation and state persistence across pages
- Improved clarity of user-facing messages for better usability

---

## 4. High-Priority Fixes (PR References)

- PR #XX – - Improved global navigation by adding a persistent logo link for quick return to homepage, enhancing usability and consistency across pages

---

## 5. Final Readiness Assessment

The system has been tested end-to-end following the planned demo path.

- Core workflows function correctly
- Authentication and validation behave as expected
- System handles common failure scenarios gracefully
- Minor issues remain but do not block demonstration

The project is ready for final presentation with high confidence.