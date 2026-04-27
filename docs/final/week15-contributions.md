## Individual Contribution Snapshot
The following is a list of our team members and their major contributions since Beta, relevant PRs / commits / docs / reviews, and what they will speak to during the final presentation.

---

### Keenan Johnson
Role: Lead/Architect

Major contributions since Beta:
- Refactored major page file (technical debt)
  - Refactored DestinationResultsPage
  - Seperated the two core views of this page into two seperate view components
  - Created a Flight Card component for further scalabilty
  - Separated the fetching and sorting into its own hook file top to ensure separation of problems
  - Implemented a test (hookRefactorTest.test.js) that validates the refactor by ensuring already established logic still functions properly and the API handles errors gracefully
- Implemented a dropdown field that populates when users get destination suggestions, ensuring users can quickly see flights from their entered airport to proposed destinations
- Fixed an error in logic from adding protection to the PUT api/search endpoint
- Implemented CI fixes after refactoring
- Designed API contract documentation to match current system
- Created Release Candidate and documentation to match
- Deleted out of use endpoints

Relevant PRs / Commits / Docs / Reviews:
- Refactoring and error fixing: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/105 
- API and RC documentation and out of use endpoints: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/113
- Commit for dropdown: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/105
- Doc for refactoring: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/final/week13-refactoring.md
- Doc for API documentation: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/api/openapi.yaml
- Doc release candidate: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/docs/releases/release-candidate.md

Speaking points during the final presentation:
- Live demo of the primary workflow
- Architecture and major technical decisions

---

### Quinnie Ho
Role: PM/Scrum and Docs Lead

Major contributions since Beta:
- Scheduled and led team meetings
- Ensured weekly developments and deliverables are in alignment with scope and deadlines
- Managed project risks and unblocked team by owning risk management and conflict resolution for both internal and external conflicts 
- Created and tracked weekly sprint goals and committed backlogs
- Developed user registration page
- Developed user sign-in page
- Developed welcome display for logged-in users
- Beta retrospective document
- User guide
- Admin/maintenance guide
- Ensured README and Beta documentation alignment
- Polished repo
- Created and structured presentation plan

Relevant PRs / Commits / Docs / Reviews:
- Developed user registration page, user sign-in page, and welcome display for logged-in users: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/69
- Beta sprint 2: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/76
- Beta sprint 3: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/88
- Beta retrospective and final sprint plan: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/97
- README and Beta documentation alignment: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/99
- Final sprint 1: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/108
- Hand-off document draft: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/110
- User guide: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/124
- Admin/maintenance guide: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/116
- Documentation alignment and repo polish: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/120

Speaking points during the final presentation:
- Problem and target users
- Major challenge(s) and how the team addressed them

---

### Zengtao Wu
Role: DevOps/QA 

Major contributions since Beta:
- Led testing strategy and expanded automated test coverage across the system
- Implemented validation, authentication, and integration tests to ensure system reliability
- Stabilized CI pipeline by resolving test failures and improving test consistency
- Verified end-to-end workflows (login → search → results → saved flights → compare)
- Improved frontend-backend integration and ensured correct data flow through URL parameters and API calls
- Enhanced user-facing error handling and validation to prevent invalid operations
- Contributed to system observability and debugging through structured logging and test validation

Relevant PRs / Commits / Docs / Reviews:
- Added Saved Flights modal (API + Navbar integration): https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/93
- Additional test coverage and integration testing: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/103
- Observability and error handling improvements: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/104
- UI improvements and add compare flights feature: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/112
  
Speaking points during the final presentation:
- Final system overview
- Testing / CI / deployment summary