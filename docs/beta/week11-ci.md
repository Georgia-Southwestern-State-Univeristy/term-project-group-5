# Week 11 — Testing + CI Stability

## Overview

This week focuses on strengthening confidence in our system through automated testing of real workflows, validation, and system behavior.

Based on Week 10 feedback, we improved:
- Clear demonstration of system behavior through tests
- Better coverage of real user workflows
- Explicit validation of API responses and data structures

---

## New Tests Added (6 Total)

We added 6 new automated tests covering flight search, authentication validation, and system reliability.

---

### 1. Flight Search E2E Test
**File:** `flight.e2e.test.js`

**Purpose:**  
Simulates a real user submitting a flight search request.

**What it verifies:**
- User input is accepted
- Search endpoint responds successfully
- Core feature (flight search) is functional

---

### 2. Flight Schema Validation Test
**File:** `flight.schema.test.js`

**Purpose:**  
Ensures backend returns correctly structured data from the flight API.

**What it verifies:**
- Response contains expected fields (e.g., price, itinerary)
- Backend correctly maps external API data to frontend-friendly format

**Why this matters:**  
Directly validates that backend → frontend data contract is correct, aligning with team E2E expectations.

---

### 3. Flight Search Validation Test
**File:** `flight.validation.test.js`

**Purpose:**  
Ensures invalid input is safely rejected.

**What it verifies:**
- Empty or malformed input returns `400 Bad Request`
- Backend validation prevents incorrect or unsafe requests

---

### 4. Flight Search Flow Test (Multi-component)
**File:** `flight.flow.test.js`

**Purpose:**  
Validates multi-step request handling across the system.

**What it verifies:**
- Data flows correctly from request → controller → response
- System does not crash under valid structured input

---

### 5. Auth Validation Test
**File:** `auth.validation.test.js`

**Purpose:**  
Ensures password strength rules are enforced.

**What it verifies:**
- Weak password → rejected with `400`
- Security rules are correctly applied

---

### 6. Auth Duplicate User Test
**File:** `auth.duplicate.test.js`

**Purpose:**  
Ensures duplicate accounts cannot be created.

**What it verifies:**
- Same email cannot be registered twice
- Business rules and database integrity are enforced

---

## Requirement Coverage

| Requirement | Status |
|------------|--------|
| 4+ new tests | ✅ (6 added) |
| 2 E2E workflow tests | ✅ (Flight E2E + Schema validation) |
| 1 integration / multi-component test | ✅ (Flight Flow) |
| 1 failure-path test | ✅ (Validation tests) |

---


## CI Evidence

All tests were executed through GitHub Actions CI pipeline:

- Workflow: `build-deploy`
- Result: ✅ Passed

**Evidence:**
- PR: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/86
- CI Run: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/23695184490/job/69029220143

---

## CI Failures & Fixes

During development, several CI issues occurred:

1. Missing dependency (`cors`)
   - Fix: Installed dependency in backend

2. Database connection issues in tests
   - Fix: Added proper `mongoose.connect()` and teardown

3. Test timeouts due to missing DB connection
   - Fix: Ensured DB connection is established before API calls

After fixes, all tests passed successfully.

---

## Improvements Based on Week 10 Feedback

We improved our testing approach by:

- Making system behavior explicitly testable and visible
- Verifying real workflows instead of isolated logic
- Ensuring API responses are validated (not just status codes)
- Aligning tests with actual system behavior and design decisions

---

## Conclusion

These tests provide confidence in:

- Core feature functionality (flight search)
- Data correctness between backend and frontend
- Input validation and failure handling
- System stability under normal and invalid conditions