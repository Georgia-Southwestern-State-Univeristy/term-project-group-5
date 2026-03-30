## Reliability Risks:

1. The FlightSearchCard component does not navigate to the FlightResults on its own.

2. When FlightSearchCard is hard-coded to navigate to FlightResultsPage the data is not carried over. This, in turn, causes users to have to fill out information regarding flights twice.

3. When users sign out, the protected button on FlightSearchCard does not update, allowing previously logged in users to interact with the submit button even after logging out.

## Fixed issues: #1, #2

## Before VS. After

#1 Before:
When a user would fill out the Flight Search form (from the homepage), they would either be redirected to the destination preferences page, or (from the destinations page) they would be directed to the flight results. This is due to the navigation being hardcoded from the two pages, instead of being embedded into the component.

#1 After:
When a user fills out the search form and presses Search, they will now always be directed to the fliht results.

#2 Before:
When a user fills out the flight search form, presses submit, and is redirected to the flight results, they would have to fill out the form again on the next page to actually be returned with results.

#2 After:
When a user fills out the flight search form and populates/is directed to the the flight results, the data is moved from the first page to the next page. Users will also not have to press submit again. They will be redirected and flight results will automatically make the request to receive flights.
