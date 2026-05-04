## 1. Where to Start

We recommend reviewers begin with the following:

We recommend reviewers begin with the following key entry points:

- **README.md** → Project overview and quick start guide  
- **Architecture Documentation** → `/docs/architecture/`  
- **Deployment Guide** → `/docs/deployment/`  
- **User Guide** → `/docs/user-guide.md`  
- **Admin Guide** → `/docs/admin-guide.md`  
- **Testing & Quality** → `/docs/beta/week12-quality.md`  
- **Release Notes** → `/docs/releases/final-release.md`  
- **Hand-off Document** → `/docs/handoff/`  

These documents provide a complete overview of the system, how to run it, and how it was validated.

---

## 2. How to Run the System

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Clone the repository:
   git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5.git

2. Navigate to project directory:
   cd term-project-group-5

3. Start the system:
   docker-compose up --build

4. Access the application:
   Frontend: http://localhost:5173  
   Backend: http://localhost:5001

---

## 3. Testing and CI Evidence

We implemented multiple levels of testing:

- Unit / Component Testing: Vitest + React Testing Library
- Integration Testing: Frontend-backend API interaction
- End-to-End Testing: Full user workflow validation

CI is configured using GitHub Actions:
- CI is configured using GitHub Actions
- All pull requests must pass required checks (e.g., build-deploy pipeline)
- Tests run automatically to detect issues early and maintain system stability

CI evidence:
- GitHub Actions: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions
- Example passing PR: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/25267419243/job/74084135683

---

## 4. Key Project Artifacts

The repository is structured for clarity and easy navigation:

- README.md → Project overview and quick start
- /docs/architecture/ → System design and architecture decisions
- /docs/adr/ → Architecture Decision Records
- /docs/api/ → API and interface documentation
- /docs/deployment/ → Deployment instructions
- /docs/security/ → Security considerations and practices
- /docs/data/ → Data-related documentation
- /docs/user-guide.md → End-user instructions
- /docs/admin-guide.md → Admin and system management guide
- /docs/releases/ → Release notes (Beta, Final)
- /docs/handoff/ → Knowledge transfer and project handoff
- /docs/final/ → Final deliverables

---

## 5. Final Cleanup

During the final week, we completed:

- Removed unused code and debug logs
- Standardized file structure and naming
- Updated documentation
- Verified all features work end-to-end
- Ensured CI passes consistently