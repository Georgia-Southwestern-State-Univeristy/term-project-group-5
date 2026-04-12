# Week 13 – Observability + Support Visibility

## Overview

This week focused on improving system observability, debugging capability, and deployment reliability. We implemented structured logging in the backend, enhanced frontend error handling, and introduced a dedicated health check endpoint integrated into the CI pipeline. These improvements make the system easier to monitor, debug, and support, aligning the project more closely with real-world production practices.

---

## Improvement 1 – Structured Logging for Destination Search

### What issue it addresses

Previously, debugging destination search issues was difficult due to lack of structured logs and limited visibility into request flow and validation failures.

### Where it applies

Backend: `destinationController.js`

### What was implemented

We added structured logging to track the full lifecycle of destination search requests:

- `DESTINATION_SEARCH_REQUEST` – when a request is received
- `DESTINATION_SEARCH_VALIDATION_FAILED` – when validation fails
- `DESTINATION_SEARCH_INVALID_ID` – when an invalid ObjectId is detected
- `DESTINATION_SEARCH_SUCCESS` – when results are returned successfully
- `DESTINATION_SEARCH_ERROR` – when unexpected errors occur

Each log includes:

- requestId (for tracing requests)
- timestamp
- statusCode
- resultCount
- durationMs (performance measurement)

Example log:

```json
{
  "level": "INFO",
  "event": "DESTINATION_SEARCH_SUCCESS",
  "requestId": "1234",
  "statusCode": 201,
  "resultCount": 5,
  "durationMs": 42
}
```

### How it helps

Enables tracing requests across the system, helps identify validation issues quickly, supports performance monitoring, and improves debugging and support visibility.

### Before

Destination search requests had minimal logging, making it difficult to trace request flow, diagnose validation failures, or understand why certain results were returned.

### After

Structured logging was added to capture request lifecycle, validation errors, and successful responses with requestId and timing information.

### Impact

Future maintainers can quickly trace issues, understand failures, and analyze performance without needing to manually reproduce bugs.

---

## Improvement 2 – Logging for Destination Fetch Endpoint

### What issue it addresses

The destination fetch endpoint previously had no logging, making it difficult to diagnose failures or monitor API usage.

### Where it applies

Backend: getDestinations controller

### What was implemented

We added structured logs for:

- DESTINATION_FETCH_REQUEST
- DESTINATION_FETCH_SUCCESS
- DESTINATION_FETCH_ERROR

### How it helps

Provides visibility into API usage, helps detect slow queries or failures, and improves maintainability and debugging.

### Before

The destination fetch endpoint had no logging, providing no visibility into API usage, failures, or performance.

### After

Structured logs were added for request, success, and error cases, including response time and result count.

### Impact

Maintainers can now monitor API usage, detect failures, and debug issues more efficiently.

---

## Improvement 3 – Health Check Endpoint

### What issue it addresses

Previously, CI relied on feature endpoints (e.g., /api/attributes) to determine if the backend was running. This created unnecessary coupling between system readiness and application logic.

### Where it applies

Backend: new endpoint /api/health

### What was implemented

A lightweight health check endpoint:

```js
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
```

### How it helps

Provides a reliable system readiness check, separates infrastructure health from business logic, improves deployment stability, and reduces false CI failures.

### Before

CI relied on feature endpoints (e.g., /api/attributes) to determine if the backend was running, which could fail due to unrelated application logic issues.

### After

A dedicated /api/health endpoint was introduced to provide a lightweight and reliable system readiness check.

### Impact

Operators can quickly verify if the backend is running independently of business logic, reducing confusion and improving deployment reliability.

---

## Improvement 4 – CI Pipeline Enhancement

### What issue it addresses

CI previously depended on application endpoints to determine system readiness, which could fail due to unrelated logic issues.

### Where it applies

GitHub Actions CI workflow

### What was implemented

We introduced a two-step validation process:

1. Health check (/api/health) to confirm the backend is running
2. Attributes API check (/api/attributes) to confirm application functionality

Updated CI steps:

```yaml
- name: Wait for Health Check
  run: |
    timeout 60s bash -c 'until curl -s http://localhost:5001/api/health; do sleep 5; done'

- name: Verify Attributes API
  run: |
    RESPONSE=$(curl -s http://localhost:5001/api/attributes)
    if [[ $RESPONSE == *"["* ]]; then
      echo "Success: Attributes API returned data."
    else
      docker compose -f docker-compose.yml logs backend --tail 50
      echo "Failure: Attributes API response invalid"
      exit 1
    fi
```

### How it helps

Separates system-level checks from feature-level checks, reduces false positives in CI failures, improves debugging clarity, and follows real-world DevOps practices.

### Before

CI checks combined system readiness and application logic validation, making it difficult to determine whether failures were caused by infrastructure or code issues.

### After

CI now uses a two-step process: a health check for system readiness and a separate API check for application functionality.

### Impact

Failures are easier to diagnose, reducing debugging time and improving overall reliability of deployments.

---

## Improvement 5 – Frontend Error Handling and Fallback States

### What issue it addresses

The frontend previously lacked clear feedback when API calls failed or returned empty data, leading to poor user experience.

### Where it applies

Frontend: AttributesPage

### What was implemented

We added:

- Error message display (Failed to load attributes)
- Empty state handling (No attributes available)
- Validation feedback (You must select at least one attribute)

### How it helps

Improves user experience, makes system issues visible to users, reduces confusion during failures, and supports debugging from the UI level.

### Before

The frontend provided little to no feedback when API requests failed or returned empty data, leading to poor user experience and confusion.

### After

Clear loading states, error messages, and fallback UI were implemented to handle API failures and empty responses.

### Impact

Users receive immediate feedback, and developers can more easily identify issues without inspecting backend logs.

---

## PR Links


- https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/104/


