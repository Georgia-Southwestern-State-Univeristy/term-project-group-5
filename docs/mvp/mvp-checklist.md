# MVP Stories Status
1.	Access Homepage: Done
2.	Enter Search Preferences: Done
3.	Submit Search Request: Done
4.	View Destination Suggestions: Done
5.	Update Dates and Travelers on Results Page: Done

Link to our GitHub Project Board showing user story status: https://github.com/orgs/Georgia-Southwestern-State-Univeristy/projects/29/views/1

<br> 

----

# Acceptance Criteria
**1. Access Homepage**
* Navigating to the root URL (/) loads the homepage.
* The homepage displays a “Find Flight” search form.
* The search form contains the following fields:
  * Departure (City or airport)
  * Destination (City or airport)
  * Departure Date
  * Return Date
  * Travelers
* The homepage displays a “Find Your Next Destination” section.
* A “Start Here” button is visible below the introduction text.
* The page loads successfully without UI or console errors.

**2. Enter Search Preferences**
* Clicking the “Start Here” button navigates the user to the Search Preferences page (/attributes).
* The Search Preferences page displays a form titled “Search Preferences.”
* The form contains dropdown fields for:
  * Popularity
  * Climate
  * Activity
  * Price
  * Vibe
  * Setting
* Each field allows the user to select one option from the dropdown list.
* Users must select an option from at least one drop-down field.
* The page includes a “Find My Destination” button to submit the preferences.

**3. Submit Search Request**
* A “Find My Destination” button is displayed at the bottom of the preferences form.
* Clicking the button submits the selected search preferences.
* After submission, the user is navigated to the Results page (/results).
* Navigation occurs without a full page reload.
* If submission fails, an error message is displayed.

**4. View Destination Suggestions**
* The Results page displays a section titled “Destination Suggestions.”
* Destination suggestions appear as cards in a grid layout.
* Each destination card includes:
  * Destination image
  * Destination name
  * Short description
  * “View Details” button
* Multiple destination cards can be displayed simultaneously.
* The page includes a “Back to Search” link.

**5. Update Dates and Travelers on Results Page**
* The results page includes a search bar at the top identical to the homepage search form.
* The search bar contains editable fields for:
  * Departure
  * Destination
  * Departure Date
  * Return Date
  * Travelers
* Users can modify these fields directly on the results page.

<br> 

----

# Top 3 Risks Heading into Beta & Mitigation Plan
