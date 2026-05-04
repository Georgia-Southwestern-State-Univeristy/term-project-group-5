## System Overview

Our system contains a dockerized MERN-stack prototype for a flight aggregation platform that allows users to search and compare flights.
Furthermore, users can create an account and log in to access exclusive features such as the suggestions destination form.
Filling out this form based on the user's selected preferences allows a return of destination suggestions. From here, users can search flights based on
the suggested destinations. Booking and payment are out of scope.

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

### Issue 1 — Flight Comparison Feature Not Implemented

**Priority:** Low

**Description:**  
The system currently does not support comparing saved flights side-by-side.

**Affected Area:**  
Frontend (SavedFlights UI) / Backend (saved flights data handling)

**Likely Cause:**  
The comparison feature was planned but not implemented during the Beta phase due to prioritization of core functionality.

**Planned Action:**

- Design UI for side-by-side comparison (e.g., table or card layout)
- Allow users to select multiple saved flights
- Display key attributes (price, duration, stops) in a comparable format
- Add supporting tests for selection and comparison behavior

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

---

## Recommended Next Steps

The following are our recommended next steps for a future team:

- Invest in an API that can call and return both cities and airport codes
- Optimize frontend so that the website subjectively performs or looks better
- Optimize backend so that the system performs better and is more scalabale as the website expands to include more features

## Maintenance Notes

Logging:

When starting the system locally, the logs can either be found in the terminal where the docker command was ran, or from the Docker Desktop application. The Docker application is the most visually pleasing of the two seeing as you can read the logs for one of our three containers seperately from the others.

The backend should print messages saying evetything is connected. The frontend shold say the same and print a local link to the system for development. The database container will print several logs and checkpoints.

It is important when adding new endpoints, to add logging following the format that our system shows, so as to keep debugging and diagnosis as smooth as possible.

.env:

Every developer running the system locally, should have their own .env file. It is imperative that the MONGO_URI variable is specific to them. The team member leading the management of the MongoDB project, must add them to the project and they must navigate to the site to receive their own personal link.

When a new line should be added to every dev's .env, the same line should be added on Github as secret, and to Render as an environment variable. This is imperative for the CI pipeline and live service to work correctly.

The external API, is a monthly subscription. It will stop working whenever the maximum amount of requests are put in. Rate liumiting is implemented, but usage should be monitored to ensure the most efficient subscription is active at all times.

Dependencies:

The system is containerized. No developer should have to npm install any dependencies unless it a brand new dependency to the system.

Airport Codes:

The logic to assign an airport code to a destination when getting suggetions is not scalable. Until the data model for destinations is updated, it is important to remember to add the destination and its corresponding airport code to the dictionary in the FlightSearchCard component when adding a new destination.

Deployment:

The live link will update every time the main branch is updated. Render has a very intuitive UI that will let you know if everything is working correctly. It is important to remember that Render needs all the .env variables a local developer would need to run the system.
