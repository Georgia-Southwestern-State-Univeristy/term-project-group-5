## Risks Identified

1. Weak password rules allow insecure accounts
2. No rate limiting on flight search API (risk of abuse)
3. Lack of backend input validation on flight search API

## Fixes Implemented

- Added password validation (minimum length + complexity)
- Implemented rate limiting on /api/flights/search endpoint
- Added validation to ensure: 
    - Required fields are present
    - Valid data types for inputs
    - Logical correctness (return date after departure)

## Before

- Users could register with weak passwords
- Unlimited API requests allowed
- API accepted empty or invalid request data

## After

- Password strength enforced
- API requests limited to prevent abuse
- API rejects invalid requests with 400 response
- PMalformed or malicious input is prevented at the backend.



## Evidence

All security fixes and validations were implemented in the following PR:

- PR: 

This PR includes:
- Password validation improvements
- Rate limiting for flight search API
- Backend input validation for flight search requests