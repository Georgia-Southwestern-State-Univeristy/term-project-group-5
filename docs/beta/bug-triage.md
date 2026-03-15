# Beta Bug Triage & Regression Protection

## Overview

This document tracks issues discovered during midterm demo testing and teammate QA testing.  
Each issue includes severity classification, reproducible steps, expected vs actual behavior, and resolution status.

---

# Issue 1 — Invalid ObjectId Causes 500 Error

**Severity:** Critical  
**Status:** Fixed  
**Regression Test:** Added

### Reproduction Steps
1. Send POST request to `/api/search`
2. Use body:
   {
     "attribute_ids": ["invalid-id"]
   }

### Expected Behavior
API should return:
- 400 Bad Request
- Clear validation message

### Actual Behavior (Before Fix)
- 500 Internal Server Error
- Mongoose cast exception thrown

### Fix
- Added ObjectId format validation using:
  `mongoose.Types.ObjectId.isValid()`
- Return 400 when invalid format detected

### Regression Protection
- Jest + Supertest test added:
  `backend/src/__tests__/search.test.js`
- Ensures 400 is returned for invalid ObjectId

---

# Issue 2 — Empty attribute_ids Returns Unclear Behavior

**Severity:** Major  
**Status:** Fixed  
**Regression Test:** Covered by validation logic

### Reproduction Steps
1. POST `/api/search`
2. Body:
   {
     "attribute_ids": []
   }

### Expected Behavior
400 Bad Request  
Clear message explaining requirement

### Actual Behavior (Before Fix)
Search executed incorrectly or returned empty results

### Fix
Added validation:
- attribute_ids must exist
- Must be non-empty array

Returns:
{
  "message": "At least one attribute is required to search."
}

### Regression Protection
Additional test added to ensure search endpoint returns 400 when attribute_ids array is empty.
---

# Issue 3 — No Global Error Handling

**Severity:** Major  
**Status:** Fixed  

### Reproduction Steps
Trigger any unhandled exception in controller.

### Expected Behavior
- Structured error logging
- Consistent 500 response

### Actual Behavior (Before Fix)
- Inconsistent console errors
- No correlation ID
- Unstructured logs

### Fix
Implemented:
- Global error middleware
- Structured JSON logging
- Request correlation ID

---

# Issue 4 — Lack of Request Traceability

**Severity:** Major  
**Status:** Fixed  

### Reproduction Steps
1. Perform multiple search requests
2. Inspect backend logs

### Expected Behavior
Each request should have a unique identifier to correlate logs.

### Actual Behavior (Before Fix)
Logs could not be traced to a specific request.

### Fix
Added:
- UUID requestId per request
- requestId included in:
  - Request log
  - Success log
  - Validation log
  - Error log

---

# Issue 5 — Frontend Flight Search Allowed Invalid Date Order

**Severity:** Minor  
**Status:** Fixed  

### Reproduction Steps
1. Enter departure date
2. Enter return date earlier than departure
3. Click search

### Expected Behavior
User should see validation error

### Actual Behavior (Before Fix)
Request submitted without validation

### Fix
Frontend validation added:
Return date must be after departure date

Modal displays clear message.

---

# Issue 6 — Unused Imports Causing CI Failures

**Severity:** Minor  
**Status:** Fixed  

### Problem
ESLint flagged:
- Unused logError import
- Undefined Jest globals

### Fix
- Removed unused imports
- Enabled Jest environment in ESLint config

---


# Evidence

Related PR:
- PR #48 — Observability starter + error handling 
https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/48

Regression Test:
- backend/src/__tests__/search.test.js

CI Run:
-  CI pipeline passed for PR #48