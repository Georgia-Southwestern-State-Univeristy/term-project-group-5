# term-project-group-5

## Project Overview
This repository contains a Dockerized MERN-stack prototype for a flight aggregation platform that allows users to search and compare flights. Booking and payment are out of scope.

## Core Value Proposition
Let us do the research and upfront work to help you figure out your next travel destination! All you have to do is provide us your preferences such as your prefered vibe and budget.

## Prerequisites

You must have installed:

- Docker Desktop
- Git

Check Docker:

```bash
docker --version
docker compose version
```

## Quick Start (Recommended)

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

## Verify It Works

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

## Common Issues

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

## Main Tech Stack
- Database: MongoDB
- Backend: Node + Express API
- Frontend: React UI
- Container: Docker

## Current Feature Summary
- Flight search and browsing: Users can search for flights on the homepage by inputting departure city or airport, destination city or airport, departure date, return date, and number of travelers. Search results display multiple flight options with key comparison details such as price, airline, duration, and number of stops.
- Destination suggestion: Users can access the flight destination suggestion feature from the homepage by clicking on the Start Here button. This takes user to a new page with a form to enter travel preferences such as destination vibes and budget. Submitting this form takes users to a new page with returned destination suggestions that match their inputted preferences.
- Filter results: Users can filter flights by price, duration, number of stops, or airline.
- User account registration: Users can create an account and securely log in
- User authentication: Users with a registered account can log into their account to access special features.
- Saved searches: Logged-in users can save selected flight searches for future reference. Saved searches allow users to revisit the website and compare options at any time in the future without needing to re-enter search criteria.

## Beta Scope
The following are intentionally not finished to focus on quality improvement and end-to-end integration between frontend and backend for our must-have features mentioned under Current Feature Summary:
- Previous search retrieval by user: Users can recall previous searches to not have to refill out information.
- Backend optimization: Website performs better or has stronger features in the backend.

Deployment link: https://term-project-group-5-front.onrender.com


