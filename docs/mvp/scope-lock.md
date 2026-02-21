**MVP User Stories**
1.	Access Homepage: As a traveler exploring trip options, I want to access the homepage, so that I can begin searching for destinations.
2.	Enter Search Preferences: As a traveler exploring destinations, I want to complete a search form that includes required fields and optional preference fields such as vibe, budget, and other travel interests, so that the system can generate destination suggestions that align with what I am looking for in a trip.
3.	Submit Search Request: As a traveler wanting suggestions, I want to click a “Submit” button after entering my preferences, so that I can navigate to a results page showing destination suggestions.
4.	View Destination Suggestions: As a traveler exploring options, I want to see a list of destination suggestions based on my entered criteria, so that I can consider destinations that match my preferences.
5.	Update Dates and Travelers on Results Page: As a traveler refining my search, I want to update travel dates and the number of travelers using input fields at the top of the destination results page, so that I can adjust my search without returning to the homepage.  

</br>

**Explicit Non-Goals**
* Search for Flights: A user enters origin, destination, travel dates, and number of passengers to view available flight options aggregated from multiple sources.
* Filter and Sort Results: A user filters flights by price, duration, number of stops, or airline, and then sorts results to compare options.
* View Flight Details: A user selects a specific flight to see detailed information such as layovers, total travel time, and price breakdown.
* Save Flights for Later: A user enters a username and password to create an account where they can save selected flights to a personal list for later comparison or decision-making.
* Compare Saved Flights: A user compares multiple saved flights side-by-side based on key attributes (price, duration, stops).

</br>

**Demo Script Outline**  

Step 1 - Access Homepage:
* Open the deployed web application.
* Homepage loads with a clearly visible destination search form.

Step 2 - Enter Preferences:
* Enter required fields (e.g., origin city).
* Enter optional fields (e.g., vibe = “relaxing”, budget = “moderate”).
* Leave one optional field blank to demonstrate flexibility.

Step 3 - Validate Form Behavior:
* Attempt submission with a required field missing.
* System displays validation error message.
* Fill in required field correctly.
* Click “Submit”.

Step 4 - View Destination Suggestions:
* System navigates to results page.
* A list of destination suggestions is displayed.
* Each suggestion includes:
  * Destination name
  * Short description
  * Representative image
  * Estimated budget category

Step 5 - Modify Dates and Travelers:
* At top of results page, edit:
  * Travel dates
  * Number of travelers
* Click “Update”.
* Results refresh without returning to homepage.

Step 6 - View Destination Details:
* Click on a destination.
* Modal/popup opens showing:
  * Images
  * Description
  * Basic metadata
  * “Find Flights” button (non-functional placeholder for MVP)

</br>

**Risks**

1. Frontend–Backend API Contract Drift:
    * Risk: Parallel development causes mismatched request/response formats.
    * Mitigation: Document and freeze API contracts early, require review for contract changes, and hold weekly integration checkpoints.

2. Integration Environment Misconfiguration:
    * Risk: Port, proxy, or routing misalignment prevents frontend from reaching backend.
    * Mitigation: Use centralized environment configuration, implement a /health endpoint, and validate integration before merging to main.

3. Weak or Empty Destination Suggestions:
    * Risk: Preference-to-destination mapping fails to produce relevant results.
    * Mitigation: Seed curated, tagged destination data; define clear mapping logic; implement fallback results; pre-test demo inputs.
