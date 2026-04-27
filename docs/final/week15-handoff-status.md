## System Overview

Our system contains a dockerized MERN-stack prototype for a flight aggregation platform that allows users to search and compare flights.
Furthermore, users can create an account and log in to access exclusive features such as the suggestions destination form.
Filling out this form based on the user's selected preferences allows a return of destination suggestions. From here, users can search flights based on the suggested destinations. Booking and payment are out of scope.

## Architecture Snapshot

Current architecture snapshot:

![Architecture Diagram](<../../images/Blank%20diagram%20(2).jpeg>)

or

[View Current Architecture](<../../images/Blank%20diagram%20(2).jpeg>)

## Stack and Tool Choices

- Database: MongoDB
- Backend: Node + Express API
- Frontend: React UI
- Container: Docker

---

## Setup/Run Summary

### Prerequisites

You must have installed:

- Docker Desktop
- Git

Check Docker:

```bash
docker --version
docker compose version
```

### Quick Start (Recommended)

1. Clone the repo

```bash
    git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5.git
    cd term-project-group-5
```

2. Create environment file (required)

```bash
    cp .env.example .env
```

Your .env should include at least:

    MONGO_URI=mongodb://mongodb:27017/mern-db
    PORT=5001

    Inside Docker, use mongodb (not localhost or mongo).

3. Start services

```bash
docker compose up --build
```

Services will be available at:

    Backend	http://localhost:5001

    MongoDB	localhost:27017

    Frontend http://localhost:5173/

MVP FEATURE : http://localhost:5173/attributes

### Verify It Works

1.  Check containers:

```bash
docker compose ps
```

2.  Test backend:

```bash
curl -i http://localhost:5001
```

Seeing Cannot GET / is expected — it means the backend is running.

3.  Check Mongo from backend logs:

```bash
docker compose logs -f backend
```

Look for:
mongoose connected

### Common Issues

1. .env not found
   Run:

```bash
cp .env.example .env
```

2. Backend can’t connect to Mongo

Make sure .env uses: mongodb://mongodb:27017/mern-db

Then restart:

```bash
docker compose down
docker compose up --build
```

---

## Known Weaknesses or Technical Debt

### Issue 1 — Flight Search unreliability on first search

**Priority:** Medium

**Description:**
On the first search, sometimes no flights are returned. After refreshing, flights populate.

**Affected Area:**  
Frontend is affected. User experience is harmed.

**Likely Cause:**  
The external API may be asleep after non-activity. Another probable cause may be the system not waiting long enough for results to be returned.

**Planned Action:**  
Further investigation is required to plan a course of action. No root cause has been determined for a mitigation strategy.

- If the external api is falling asleep after inactivity, caching previous searches or switching APIs may be a partial mitigation strategy.
- If the system is not waiting long enough, mitigation would be waiting longer for a response.

Since there is no confirmation that these are the root causes, no strategy is planned to be implemented.

## Issue 2 — Previous Search Retrieval Not Implemented

**Priority:** Low

**Description:**  
Users cannot view or reuse their previous flight searches.

**Affected Area:**  
Frontend + Backend (user history feature)

**Likely Cause:**  
The feature was planned but not implemented during the Beta phase due to prioritization of core workflows.

**Planned Action:**

- Store search history per user
- Create UI to display previous searches
- Allow users to re-run a previous search with one click

## Issue 3 — Limited Test Coverage for Edge Cases

**Priority:** Medium

**Description:**  
While core workflows are covered, some edge cases are not fully tested.

**Affected Area:**  
Frontend and backend test suites

**Likely Cause:**  
Focus on core functionality during Beta phase.

**Planned Action:**

- Add tests for edge cases
- Add more negative and failure scenario tests
- Expand integration coverage

## Issue 4 — Limited architectural decision documentation

**Priority:** Medium

**Description:**  
While core workflows are covered, some edge cases are not fully tested.

**Affected Area:**  
Frontend and backend test suites

**Likely Cause:**  
Focus on core functionality during Beta phase.

**Planned Action:**

- Add tests for edge cases
- Add more negative and failure scenario tests
- Expand integration coverage

---

## Recommended Next Steps

The following are our recommended next steps for a future team:

- Investigate issue #1
- Optimize frontend so that the website subjectively performs and looks better
- Optimize backend so that the system is more scalabale

## User/Admin references

User:

How to register: On entering the site, click the button "Sign In" in the top right corner. Click the "Create an Account" button. Fill out the required fields. Press "Create An Account"

How to login: On entering the site, click the button "Sign In" in the top right corner. Fill out the form. Click "Sign In".

How to get destination suggestions: You must be signed in for this feature. After signing in, click "Start here". Fill out the form to your preference. Click the submit button. Destinations should be listed in the next few seconds

How to retrieve flights: From the homepage or the destination suggestion page, fill out the form at the top with the departure and date fields. Click Search. Flights should be listed on the next page after a short wait.

How to save flights: After searching flights, you should see flight cards with a blue "Save Flight" button. To interact with this button, you must be logged in. Press this button to save a flight.

How to retrieve saved flights: You must be logged into an account with saved flights attached to it. From the homepage, you should see a dropdown menu with your profile name. After clicking, press "View Saved Flights". The saved flights attached to that account should be shown after a short wait.

## ADMIN

API Documentation - docs/api/openapi.yaml

Architecture Decision Records - docs/adr/\*

Data Model - docs/data/model.md

Live deployment website service - https://render.com/?_gl=1*14fug9y*_gcl_au*ODU1MzA2MjQ1LjE3NzUwMDI1NzYuMTQ0MzA1Mzk4My4xNzc1MDAzOTMwLjE3NzUwMDQyMjE.*_ga*MTIxMzUzNzg1My4xNzc1MDAyNTc2*_ga_QK9L9QJC5N*czE3NzcyNTg2NzQkbzYkZzAkdDE3NzcyNTg2NzQkajYwJGwwJGgw

Security Documentation: docs/security
