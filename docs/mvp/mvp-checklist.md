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

# Top 3 Risks
The following are the top 3 risks heading into beta and their mitigation plan.

**1. API or Data Availability Issues**

Risk: Destination suggestions depend on Amadeus API. Users may experience empty results or long loading times if the API fails, returns incomplete data, or responds slowly.

Mitigation Plan:
* Implement fallback data or mock destination results for testing and demo purposes.
* Add loading indicators and error messages to improve user experience.
* Monitor API responses and implement basic retry logic if requests fail.
* Validate backend responses before rendering results.

**2. Frontend–Backend Integration Issues**

Risk: The frontend and backend are being developed in parallel. The frontend may fail to properly display destination suggestions or submit search data if the API endpoints, request formats, or response structures change. 

Mitigation Plan:
* Define and maintain clear API contracts between frontend and backend teams.
* Use mock API responses during frontend development to simulate backend data.
* Test integration early using Postman or local API testing.
* Implement error handling on the frontend to gracefully manage failed API calls.

**3. Search Form Validation and User Input Errors**

Risk: Users may submit incomplete or invalid search inputs (missing dates, incorrect traveler count, invalid locations), which could cause errors in the application or incorrect results.

Mitigation Plan:
* Implement client-side validation for required fields before submission.
* Display clear validation messages if inputs are missing or invalid.
* Ensure date inputs follow proper formats and logical constraints (e.g., return date after departure).
* Sanitize and validate inputs again on the backend.
