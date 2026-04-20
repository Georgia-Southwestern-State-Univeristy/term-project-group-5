## Note: System is constantly deployed using Render. The link to the live system is below. Following, are steps to run the system locally

Link: https://term-project-group-5-front.onrender.com

## Prerequisites

You must have installed:

    Docker Desktop
    Git

-Check Docker:

    docker --version
    docker compose version

## Quick Start (Recommended)

- Clone the repo
  git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5.git
  cd term-project-group-5

- Start Docker Desktop
  - Start up docker desktop. The Docker Engine must be running before docker commands can be ran
- Create environment file (required)
  cp .env.example .env

  Your .env should include at least:

  MONGO_URI=mongodb://mongodb:27017/mern-db
  PORT=5001
  RAPIDAPI_KEY=32194810923NotActualKey252-394-0
  JWT_SECRET=not_so_secret_key

  None of these are actual keys since they are sensitive. The MONGO_URI is to connect to our database. PORT is of course the port our backend is at. RAPIDAPI_KEY is the key to connect to our external API. JWT_SECRET is they hashing key we use for hashing user passwords.

  Inside Docker, use mongodb (not localhost or mongo).

- Start services
  docker compose up --build

Services will be available at:

Backend http://localhost:5001
MongoDB localhost:27017
Frontend http://localhost:5173/

- Verify It Works
  Check containers:
  docker compose ps
  Test backend:
  curl -i http://localhost:5001
  Seeing Cannot GET / is expected — it means the backend is running.

Check Mongo from backend logs:
docker compose logs -f backend
Look for: mongoose connected

Common Issues
.env not found Run:
cp .env.example .env

Backend can’t connect to Mongo
Make sure .env uses: mongodb://mongodb:27017/mern-db

Then restart:

    docker compose down
    docker compose up --build

#### Evidence

- Containerization ensured start up steps haven't changed since the beginning. Retesting start up steps showed the following.

## What failed

- Several endpoints, when ran locally, do not work due to not having real keys. This is unavoidable as putting the real keys into the repo is a security concern.

## What was corrected

- .env.example was updated to include the RAPIDAPI_KEY and the JWT_SECRET as placeholders.

## Note

- Full system able to be accessed and utilized from live deployment link.
