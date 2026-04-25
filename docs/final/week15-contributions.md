## Individual Contribution Snapshot
The following is a list of our team members and their major contributions since Beta, relevant PRs / commits / docs / reviews, and what they will speak to during the final presentation.

### Keenan Johnson
Role: Lead/Architect

Major contributions since Beta:

Relevant PRs / Commits / Docs / Reviews:

Speaking points during the final presentation:
- Live demo of the primary workflow
- Architecture and major technical decisions

### Quinnie Ho
Role: PM/Scrum and Docs Lead

Major contributions since Beta:

Relevant PRs / Commits / Docs / Reviews:

Speaking points during the final presentation:
- Problem and target users
- Major challenge(s) and how the team addressed them

### Zengtao Wu
Role: DevOps/QA 

### Major Contributions Since Beta

- Led testing strategy and expanded automated test coverage across the system
- Implemented validation, authentication, and integration tests to ensure system reliability
- Stabilized CI pipeline by resolving test failures and improving test consistency
- Verified end-to-end workflows (login → search → results → saved flights → compare)
- Improved frontend-backend integration and ensured correct data flow through URL parameters and API calls
- Enhanced user-facing error handling and validation to prevent invalid operations
- Contributed to system observability and debugging through structured logging and test validation

---

### Relevant PRs / Commits / Docs / Reviews

- PR #93 Add Saved Flights modal (API + Navbar integration) 
- PR #103 – Additional test coverage and integration testing
- PR #104 – Observability and error handling improvements
- PR #112 – UI improvements and add compare flights feature
  
---

### Speaking Points During Final Presentation

Final system overview

-Our system is a MERN-based flight search platform that allows users to search destinations, view flight results, and manage saved flights. After the Beta release, our focus was ensuring the system is stable, testable, and ready for demonstration through improved testing and validation.

Testing / CI / deployment summary

- Explain how testing ensures system stability and correctness
- Walk through integration test covering full user flow (search → results)
- Describe how authentication enforcement is validated
- Explain how frontend and backend interact via API and URL parameters
- Highlight how system handles invalid input and external API failures
