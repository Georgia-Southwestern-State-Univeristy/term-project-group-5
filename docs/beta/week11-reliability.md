Reliability Risks:

these arent particularly reliability risks, but more features to enhance user experience.

1. The FlightSearchCard component does not navigate to the FlightResultsPage on its own. 
2. When FlightSearchCard is hard-coded to navigate to FlightResultsPage the data is not carried over. This, in turn, causes users to have to fill out information regarding flights twice.
3. When users sign out, the protected button on FlightSearchCard does not update, allowing previously logged in users to interact with the submit button even after logging out.
