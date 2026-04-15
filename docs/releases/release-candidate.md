## Release Tag - Date

rc-v0.1 - 

## Core workflows

1. Flight search and aggregation
2. Destination suggestion based on user pref.
3. User registration/Authentication
4. Saving -> Displaying flights to user profile

## Major differences from beta
- After searching destination suggestions, the destination field for searching flights is populated with a dropdown containing the displayed locations.
- Comparing saved flights per user.
- Refactoring (DestinationResultsPage) - Broke down major components into seperate files to achieve seperation of problems and improve readability.

## Remaining known risks before final release
- Third Party API inconsistency
- Lost coupling due to refactoring
- Edge case test coverage
- Unproven scalability for upcoming features

## What must still be completed 
- UI upgrades
- Backend scalability improvements

## Release Artifact Link
