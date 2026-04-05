## Release Name + Tag:

- TravelGuru Beta Release, v2.0.0

## Release Date:

- 4/5/2026

## Major features/workflows:

- Destination suggestion form (Workflow)
- Flight search + aggregation
- Flight sorting (Price, Airline, Stops, etc.)
- Registration and Logging in
- Authorization attached to certain endpoints
- Saving flights to profile
- Retrieving all saved flights
- Data transfer between pages when filling out flight search form

## Important fixes since week 10-11:

- Users no longer have to fill out flight search information twice to be returned with results. Searching from the homepage and the destinations page will seamlessly transition into being returned with flights in the same spot.
- Rate limiting has been implemented to protect against system abuse.
- Added validation for weak password, missing field, invalid entries, etc.

## Known limitations still present:

- The flight search card doesn't populate a drop down when on the destinations page. This may cause confusion for users who see a new destination they are interested in but don't know the AITA code they need.
- Users have to refresh to be able to access guest user blocked features after logging in. This may cause confusion for users that still can't access blocked features after logging in.

## Link to release page:
