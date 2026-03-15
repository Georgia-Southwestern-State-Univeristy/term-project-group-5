# Beta Observability & Error Handling

## Overview

This document describes the logging, observability, and error-handling mechanisms implemented to support the Beta phase of the system.

The goal is to ensure that:
- User actions can be traced end-to-end
- Validation failures are clearly distinguished from server errors
- Logs are structured and consistent
- Backend behavior is observable in real time
- Regressions are protected by automated tests
---
## 1. Where Logs Live

All backend logs are written as structured JSON to:

- Docker container stdout
- Viewable via:
  - `docker-compose up`
  - `docker logs <backend-container>`

This allows real-time inspection during Beta testing.

---

## 2. Logged Events

The following key user actions are logged:

1. ATTRIBUTE_FETCH_REQUEST
2. ATTRIBUTE_FETCH_SUCCESS
3. DESTINATION_SEARCH_REQUEST
4. DESTINATION_SEARCH_SUCCESS
5. DESTINATION_SEARCH_VALIDATION_FAILED
6. UNHANDLED_SERVER_ERROR

All logs follow a structured JSON format including:

- level
- event
- requestId
- timestamp
- contextual metadata

---

## 3. Correlating User Actions

Each request is assigned a unique UUID (`requestId`).

This ID appears in:

- Request log
- Success log
- Validation log
- Error log

This allows tracing a single user action end-to-end.

Example:

```json
{
  "level": "INFO",
  "event": "DESTINATION_SEARCH_REQUEST",
  "requestId": "af39c614-040e-4e1b-985a-2738e078b635"
}

```json
{
  "level": "INFO",
  "event": "DESTINATION_SEARCH_SUCCESS",
  "requestId": "af39c614-040e-4e1b-985a-2738e078b635"
}

## 4. Validation Handling

Validation is enforced at both frontend and backend layers.

This ensures:

- Better user experience

- Data integrity protection

- Clear separation between 400-level and 500-level errors

### Frontend Validation (UX Level)

The frontend prevents invalid submissions before reaching the server:

1. Required fields:
   - Departure and Destination must be provided.
2. Date logic validation:
   - Return date must not be earlier than departure date.

Example frontend error message:

```json
"Return date must be after departure date."

These checks improve usability and reduce unnecessary API calls.


### Backend Validation (API-Level Protection)

The backend validates input before database operations to prevent unhandled runtime exceptions.

Case 1: Invalid ObjectId format

If a request is sent with:

```json
{
  "attribute_ids": ["invalid-id"]
}

The API now responds with:
```json
{
  "message": "Invalid attribute ID format."
}

Status Code: 400 Bad Request

This prevents Mongoose casting errors and avoids unnecessary 500 responses.

Automated regression tests were added to ensure this validation remains enforced.

Case 2 — Empty attribute_ids

If attribute_ids is empty:

The API responds with:

```json
{
  "message": "At least one attribute is required to search."
}

Logged as:

DESTINATION_SEARCH_VALIDATION_FAILED



## 5. Global Error Handling

All unhandled exceptions are captured by a centralized error middleware.

This ensures:

Consistent 500 responses

Structured ERROR logging

No duplicated error-handling logic

Clear separation between:

- Controlled validation failures (400)

- Unexpected server errors (500)

## Sample Log Snippet

```json
{
  "level": "INFO",
  "event": "DESTINATION_SEARCH_SUCCESS",
  "requestId": "af39c614-040e-4e1b-985a-2738e078b635",
  "resultCount": 1,
  "durationMs": 161
}

## 6. Regression Protection

Automated backend tests were added using:

- Jest

- Supertest

Regression case covered:

- POST /api/search with invalid ObjectId

- Expected result: 400 Bad Request

This ensures validation logic cannot silently regress in future updates.