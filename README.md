# term-project-group-5
This repository contains a Dockerized MERN-stack prototype for a flight aggregation platform that allows users to search and compare flights. Booking and payment are out of scope.

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
1) Clone the repo
```bash
    git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5.git
    cd term-project-group-5
```
2) Create environment file (required)
```bash 
    cp .env.example .env
```
Your .env should include at least:

    MONGO_URI=mongodb://mongodb:27017/mern-db
    PORT=5001
    
    Inside Docker, use mongodb (not localhost or mongo).

3) Start services
```bash
docker compose up --build
```
Services will be available at:

    Backend	http://localhost:5001

    MongoDB	localhost:27017
## Verify it works
1)  Check containers:
```bash
docker compose ps
```
2)  Test backend:
```bash 
curl -i http://localhost:5001
```
Seeing Cannot GET / is expected — it means the backend is running.

3)  Check Mongo from backend logs:
```bash
docker compose logs -f backend
```
Look for: 
mongoose connected
## Common Issues
1) .env not found
Run:
```bash
cp .env.example .env
```
2) Backend can’t connect to Mongo

Make sure .env uses: mongodb://mongodb:27017/mern-db

Then restart:
```bash
docker compose down
docker compose up --build
```

## Repo layout
backend/      Node + Express API

frontend/     React UI

docs/         ADRs and team docs

docker-compose.yml

.env.example

README.md
