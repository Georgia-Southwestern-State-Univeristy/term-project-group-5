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
- PR for refactoring and error fixing: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/105/changes
- PR for API and RC documentation and out of use endpoints: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/113/changes
- Commit for dropdown: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/105/changes/c8b6806b32d876949c990b1017c3f98c5540f7b4
- Doc for refactoring: docs/final/week13-refactoring.md
- Doc for API documentation: docs/api/openapi.yaml
- Doc release candidate: docs/release/release-candidate.md

Speaking points during the final presentation:
- Live demo of the primary workflow
- Architecture and major technical decisions

---

### Quinnie Ho
Role: PM/Scrum and Docs Lead

Major contributions since Beta:
- Created and tracked weekly sprint goals and committed backlogs
- Developed user registration page
- Developed user sign-in page
- Developed home page for logged-in users


Relevant PRs / Commits / Docs / Reviews:

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
- PR #93 Add Saved Flights modal (API + Navbar integration) 
- PR #103 – Additional test coverage and integration testing
- PR #104 – Observability and error handling improvements
- PR #112 – UI improvements and add compare flights feature
  
Speaking points during the final presentation:
- Final system overview
- Testing / CI / deployment summary