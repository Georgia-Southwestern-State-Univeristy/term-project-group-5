# Week 13 – Regression Protection & Test Strengthening

## Overview

This week focused on strengthening system reliability by adding regression tests, improving integration coverage, and ensuring that critical user flows remain protected.

Our goal was to prevent previously fixed issues from reappearing and to improve confidence in core workflows such as authentication, navigation, and search behavior.

---

## New / Improved Tests

### 1. Regression Test – Auth-Based Navigation (Start Here Button)

**What it protects:**

- Ensures navigation behavior updates immediately when authentication state changes

**Covers:**

- Logged-in users navigate to `/attributes`
- Logged-out users are redirected to `/login`
- Logout/login updates take effect without requiring a page refresh

**Related Issue:**
Previously, users who logged out could still interact with protected UI elements until the page was refreshed.

---

### 2. Regression Test – Search Flow Data Persistence

**What it protects:**

- Ensures flight search data is correctly passed from the home page to the results page

**Covers:**

- Form input values are encoded into the URL
- Results page automatically triggers search without requiring resubmission

**Related Issue:**
Previously, users had to re-enter search data after being redirected to the results page.

---

### 3. Validation & Error Handling Test – Destination Search API

**What it protects:**

- Ensures backend properly validates input before processing search requests

**Covers:**

- Missing `attribute_ids` returns 400
- Invalid ObjectId format returns 400

**Why it matters:**
Prevents malformed requests from reaching database queries and ensures predictable API behavior.

---

### 4. Authentication Protection Test – Protected Endpoints

**What it protects:**

- Ensures protected endpoints reject unauthorized requests

**Covers:**

- Requests without token return 401
- Requests with valid token succeed

**Why it matters:**
Guarantees backend security enforcement even if frontend UI fails.

---

### 5. Refactor Test (useFlightSearch.test.js):

**What it protects**

- Specifically verifies that the sortedFlights logic correctly orders flights by price (cheapest first).

**Covers**

- Refactor strength and verification

**Why it matters:**

- This ensures that the refactoring didn't break the established logic.

## Test Coverage Summary

| Category        | Count  |
| --------------- | ------ |
| Frontend Tests  | 13     |
| Backend Tests   | 14     |
| **Total Tests** | **27** |

---

## Regression Protection Strategy

We focused on protecting:

- Authentication-based UI behavior
- Navigation correctness
- API validation rules
- End-to-end data flow between pages

All previously identified bugs are now backed by automated tests.

---

## CI Evidence

All tests are passing in CI:

- ✔ Frontend: Vitest (React Testing Library)
- ✔ Backend: Jest + Supertest

👉 CI Run Link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/24212309064

---
