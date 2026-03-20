# Week 10 - Usability Improvements

## Overview
This document outlines usability issues identified during MVP testing and the improvements implemented to reduce friction in the primary user workflow.

The focus was on improving form validation, preventing invalid submissions, and providing clear feedback to users.

---

## Improvement 1: Required Field Validation

### Before
- Users could submit the flight search form without entering required fields (departure and destination).
- This resulted in failed requests or unclear behavior.
- No immediate feedback was provided to users.

### After
- Added validation to ensure both departure and destination fields are required.
- If missing, a modal is displayed with a clear error message:
  > "Departure and Destination are required."
- Form submission is prevented until valid input is provided.

### Impact
- Prevents invalid API requests
- Reduces user confusion
- Improves overall flow reliability

---

## Improvement 2: Date Validation (Return Date Logic)

### Before
- Users could select a return date earlier than the departure date.
- This resulted in logically invalid search queries.
- No feedback was provided to explain the issue.

### After
- Added validation to ensure:
  - Return date must be after departure date
- If invalid, a modal displays:
  > "Return date must be after departure date."
- Submission is blocked until corrected.

### Impact
- Prevents logically incorrect searches
- Improves data quality
- Enhances user trust in the system

---

## Improvement 3: User Feedback via Modal

### Before
- Errors were either silent or unclear.
- Users did not know why their actions failed.

### After
- Introduced a reusable modal component for validation errors.
- Modal clearly displays:
  - Error title
  - Description
  - Confirmation button

### Impact
- Provides immediate and clear feedback
- Improves user experience and accessibility
- Makes the system feel more responsive and polished

---

## Tests Added (Usability + Validation)

To ensure reliability of the improvements, the following tests were added:

- Validation test:
  - Prevent submission when required fields are missing
- Date validation test:
  - Prevent submission when return date is before departure date
- Auth tests (related to protected behavior):
  - Successful login returns token (authorized)
  - Invalid login returns 401 (unauthorized)

All tests pass locally and are ready for CI.

---

## Summary

These usability improvements directly address friction points observed during MVP testing:

- Reduced invalid user inputs
- Improved clarity of system feedback
- Prevented broken or confusing workflows

The system is now more robust, user-friendly, and closer to a Beta-ready experience.
---

## Evidence

### Test Execution
- All tests pass locally:
  - Backend: auth tests (authorized / unauthorized)
  - Frontend: validation tests for flight search form
- Total tests added this week: 4+

### CI
https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/workflows/ci.yml

- Tests are configured to run in CI via the existing pipeline
- CI run confirms that all tests pass successfully

### Pull Requests
- PR: 

  - Includes validation logic and modal feedback
  - Includes auth tests and regression tests


### Notes
- Validation improvements are implemented in `FlightSearchCard.jsx`
- Auth tests are implemented in backend (`auth.test.js`)
- These changes directly reduce user errors and improve reliability of the primary workflow