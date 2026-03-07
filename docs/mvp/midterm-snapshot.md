Current architecture snapshot:

![Architecture Diagram](<../../images/Blank%20diagram%20(1).jpeg>)

or

[View Current Architecture](<../../images/Blank%20diagram%20(1).jpeg>)

What's Implemented?

- Users can access a homepage
- Users can search flights if they just want to use the platform as a flight aggregator
- User preference form
- Destinations are being returned based on user preferences.
- Users can fill out a form to return flights after filling out destination preferences
- Searches are being saved

What's missing?:

- Flights are not being returned after filling out form.
- No authentication is implemented
- No rate limiting is implemented
- Searches are not being returned. They are only being saved

System run instructions (link to README.md):

https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/blob/main/README.md

Test Status

- Frontend
  (1) Happy path 1: Tests if attributes load and render on preference form
  (2) Happy Path 2: Tests if frontend submits selected attribute and calls search API
  (3) Failure path: Shows if it shows modal when no attribute path is selected
  (4) Boundary test: Tests if it renders page correctly when the API returns an empty array
- Backend
  (1) API Smoke test: Tests if the API is returning an array of attributes, even if it is empty.
  (2) Health check: check if API path is live when CI tests are running.

CI Status
(1) Install and set up dependencies
(2) Checks if container properly builds
(3) Checks if container starts
(4) Runs frontend tests
(5) Runs backend tests
(6) Shows logs when backend tests fail. (Ensures we receive messages printed from inside of virtual machine and container when CI is running)
(7) Shuts container down
