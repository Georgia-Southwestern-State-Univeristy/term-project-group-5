--E2E Workflow: Flight Search & Result Retrieval--

1. Complete Start to Finish workflow:

- Request Initiation: The React frontend sends a POST request to http://backend:5001/api/flights/search. The payload includes the user's travel parameters.

- External Integration: The Express controller extracts the parameters and initiates a GET request to the Flight Scraper Sky endpoint: https://flights-sky.p.rapidapi.com/flights/search-roundtrip.

- Authentication: The backend attaches the required x-rapidapi-key and x-rapidapi-host headers to authenticate the request.

- Data Transformation: Once the backend receives the raw flight data, it executes a cleaning function to remove unnecessary metadata and formats the pricing and timing into a user-friendly JSON object.

- Response Delivery: The backend sends a 200 OK status back to the frontend with the cleaned flight array.

- Response Display: The frontend receives the array an sorts based on price by default. This sorted array is then displayed onto the screen for the user to view.

2. Entry Point and User Role:

- User Role: Registered User

- Entry Point: The handleSearch function in FlightResultsPage.jsx page on the frontend.

- Trigger: The user submits a search form containing originCode (e.g., JFK), destinationCode (e.g., PARI), adults, departureDate, and returnDate from the homepage or the destinations page.

3. Major System Components Involved:

- Frontend (React):Captures user input and dispatches an HTTP POST request to the internal backend.

- Backend (Node.js/Express)Receives the internal request, acts as a proxy, and handles communication with the external API. Also filters the raw JSON from RapidAPI into a streamlined format for the UI.

- External API (Flight Scraper Sky)The third-party RapidAPI service that provides real-time global flight data.

3. Expected Output & System State:

- System State: The backend remains stateless for this specific query, though logs may record the transaction for debugging.

- Output: The frontend updates the UI state to display a list of available flights, including airlines, price, and duration. If an error occurs the page displays a "Flight search failed" or "Unable to load flight offers" message to the user depending on where the error originates from.

4. Evidence:

- PR link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/63

- Run notes: To run, follow README documentation to start. Once page is loaded, register an account and login if you are not already logged in. Next, navigate to FlightResultsPage by filling out the "Find Flight" form and pressing the "Search" button. You should be navigated to annother page. Flights should be returned after a few seconds. From this page, you can alter your flight form to look for another location.

- Passing CI link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/actions/runs/23127058438/job/67172283413
