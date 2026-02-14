This document defines how we work together on this project.

---

## Branch Naming

Create short-lived feature branches using one of these patterns:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
Examples:
feature/flight-search
fix/mongo-connection
docs/update-readme

## Pull Request (PR) Expectations

When opening a PR:

1. The PR must come from your feature branch.
2. The PR title should clearly describe the change.
3. In the PR description, list every feature or change included.
4. Keep PRs small and focused (ideally one feature per PR).
5. Direct pushes to main are not allowed. All changes must go through a pull request.Target the agreed branch “test” not “main”.
6. Request at least one teammate review before merging.
7. Ensure CI checks pass before merging.

## Review Expectations

Reviewers should check:

- Code readability and adherence to team standards
- No secrets or sensitive data are committed
- Docker environment runs successfully
- CI pipeline passes
- Clear, constructive feedback is provided when changes are needed


## How to Run Checks Locally

### Run the app with Docker
```bash
cp .env.example .env
docker compose up --build
```
Verify containers are running:
docker compose ps
Test backend:
curl -i http://localhost:5001
## Run formatter & linter
From the project root:

```bash
npm run lint
npm run format
```

## Testing a teammate’s branch
```bash
git fetch origin
git checkout <branch-name>
git pull
docker compose up --build
```