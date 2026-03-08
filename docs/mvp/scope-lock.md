**MVP User Stories**
1.	Access Homepage: As a traveler exploring trip options, I want to access the homepage, so that I can begin searching for destinations.
2.	Enter Search Preferences: As a traveler exploring destinations, I want to complete a search form that includes required fields and optional preference fields such as vibe, budget, and other travel interests, so that the system can generate destination suggestions that align with what I am looking for in a trip.
3.	Submit Search Request: As a traveler wanting suggestions, I want to click a submit button after entering my preferences, so that I can navigate to a results page showing destination suggestions.
4.	View Destination Suggestions: As a traveler exploring options, I want to see a list of destination suggestions based on my entered criteria, so that I can consider destinations that match my preferences.
5.	Update Dates and Travelers on Results Page: As a traveler refining my search, I want to update travel dates and the number of travelers using input fields at the top of the destination results page, so that I can adjust my search without returning to the homepage.

Link to our GitHub Project Board showing user story status: https://github.com/orgs/Georgia-Southwestern-State-Univeristy/projects/29/views/1

</br>

**Explicit Non-Goals**
* Search for Flights: A user is able to view available flight options aggregated from multiple sources after entering origin, destination, travel dates, and number of passengers.
* Filter and Sort Results: A user filters flights by price, duration, number of stops, or airline, and then sorts results to compare options.
* View Flight Details: A user selects a specific flight to see detailed information such as layovers, total travel time, and price breakdown.
* Save Flights for Later: A user enters a username and password to create an account where they can save selected flights to a personal list for later comparison or decision-making.
* Compare Saved Flights: A user compares multiple saved flights side-by-side based on key attributes (price, duration, stops).

</br>

**Demo Script Outline**  

Step 1 - Access Homepage:
* Open the deployed web application.
* Homepage loads with a "Find Flight" section at the top of the page that is currently just a placeholder for a feature that is scheduled for a future sprint, and a "Find Your Next Destination" section at the bottom of the page.
* Click on the "Start Here" button to navigate to the next page to the "Search Preferences" or destination suggestion form.

Step 2 - Validate Form Behavior:
* On the "Search Preferences" page, attempt submission by clicking "Find My Destination" without selecting an option from any of the drop-down menus.
* System displays validation error message.
  
Step 3 - Enter Preferences:
* Select an option from at least one of the drop-down menus (e.g., vibe = “relaxing”).
* Select an option from the remaining optional drop-down menus (e.g., budget = “moderate”).
* Leave one drop-down menu unselected to demonstrate flexibility.
* Click "Find My Destination".

Step 4 - View Destination Suggestions:
* System navigates to results page.
* A search flight form is displayed at the top of the page where users can enter travel dates and the number of travelers using input fields.
* A list of destination suggestions is displayed at the bottom of the page below the search flight form.
* Each suggestion includes:
  * Destination name
  * Short description
  * Representative image
  * "View Details" button 

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
