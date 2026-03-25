--E2E Workflow: Flight Search & Result Retrieval--

1. Complete Start to Finish workflow:
- Request Initiation: The React frontend sends a POST request to http://backend:5001/api/flights/search. The payload includes the user's travel parameters.

- External Integration: The Express controller extracts the parameters and initiates a GET request to the Flight Scraper Sky endpoint: https://flights-sky.p.rapidapi.com/flights/search-roundtrip.

- Authentication: The backend attaches the required x-rapidapi-key and x-rapidapi-host headers to authenticate the request.

- Data Transformation: Once the backend receives the raw flight data, it executes a cleaning function to remove unnecessary metadata and formats the pricing and timing into a user-friendly JSON object.

- Response Delivery: The backend sends a 200 OK status back to the frontend with the cleaned flight array.

2. Entry Point and User Role:
- User Role: Registered User

- Entry Point: The handleSearch function in FlightResultsPage.jsx page on the frontend.

- Trigger: The user submits a search form containing originCode (e.g., JFK), destinationCode (e.g., PARI), adults, departureDate, and returnDate.

3. Major System Components Involved:
- Frontend (React):Captures user input and dispatches an HTTP POST request to the internal backend.

- Backend (Node.js/Express)Receives the internal request, acts as a proxy, and handles communication with the external API. Also filters the raw JSON from RapidAPI into a streamlined format for the UI.

- External API (Flight Scraper Sky)The third-party RapidAPI service that provides real-time global flight data.

3. Expected Output & System State:
- System State: The backend remains stateless for this specific query, though logs may record the transaction for debugging.

- Output: The frontend updates the UI state to display a list of available flights, including airlines, price, and duration. If an error occurs the page displays a "Flight search failed" or "Unable to load flight offers" message to the user depending on where the error originates from.

4. Evidence:
- PR link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/63

- Run notes/Screenshot: To run, follow README documentation to start. Once page is loaded, navigate to FlightResultsPage by pressing "Start Here". Fill out the form of preferred attributes and submit. On the next page, fill out the flight search from and submit. You have now navigated to the correct page. A current issue is that a user would have to fill out their flight information again to be returned with flights. Fill out the information again and press submit to start the workflow being described. Flights should be returned after a few seconds. 

- Passing CI link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/23127058438/job/67172283413