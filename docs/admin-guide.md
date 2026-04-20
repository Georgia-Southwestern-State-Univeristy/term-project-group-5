## Setup or Deployment Summary

Deployment link: https://term-project-group-5-front.onrender.com

The following is our setup summary.

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

---

## Configuration Notes

The following are a list of links to our configuration notes:
- README.md: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5
- scope-lock.md: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/mvp/scope-lock.md
- openapi.yaml: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/api/openapi.yaml
- architecture.md: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/architecture/week13-architecture.md

---

## How to Restart, Reseed, or Recover Common States

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

## Location of Logs, Errors, or Key Diagnostics
- logger.js: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/backend/utils/logger.js
- openapi.yaml: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/api/openapi.yaml
- Run the following for runtime backend logs using Docker:
  ```bash
  docker compose logs -f backend
  ```
