# Week 12 – Known Issues & Triage List

## Overview

This document summarizes known issues, limitations, and technical debt identified during Beta testing and team discussions.

All issues have been reviewed and prioritized based on impact to core functionality, user experience, and release readiness.

---

### Issue 1 — Flight Search Dropdown Not Populating Suggested Destinations

**Priority:** Medium  

**Description:**  
On the Destination Results page, the destination field in the flight search form does not populate a dropdown menu based on the suggested destination results.

**Affected Area:**  
Frontend – FlightSearchCard / DestinationResultsPage  

**Likely Cause:**  
The component is not receiving or using the suggested destination data correctly when rendered on the results page.

**Planned Action:**  
- Pass suggested destination data to the FlightSearchCard component  
- Populate the destination input dropdown dynamically based on suggestions  
- Ensure dropdown updates when results change  

---

## Issue 2 — Login Redirects to Home Instead of Staying on Page

**Priority:** Low  

**Description:**  
When a user logs in from the Destination Results page, they are redirected to the home page instead of remaining on the current page.

**Affected Area:**  
Frontend routing / authentication flow  

**Likely Cause:**  
Login logic does not preserve the previous route or intended navigation state.

**Planned Action:**  
- Preserve redirect path before login  
- Update login flow to return user to original page  
- Add test for post-login navigation behavior  

---

### Issue 3 — Flight Comparison Feature Not Implemented

**Priority:** Low  

**Description:**  
The system currently does not support comparing saved flights side-by-side.

**Affected Area:**  
Frontend (SavedFlights UI) / Backend (saved flights data handling)

**Likely Cause:**  
The comparison feature was planned but not implemented during the Beta phase due to prioritization of core functionality.

**Planned Action:**  
- Design UI for side-by-side comparison (e.g., table or card layout)  
- Allow users to select multiple saved flights  
- Display key attributes (price, duration, stops) in a comparable format  
- Add supporting tests for selection and comparison behavior  

---

## Issue 4 — Previous Search Retrieval Not Implemented

**Priority:** Low  

**Description:**  
Users cannot view or reuse their previous flight searches.

**Affected Area:**  
Frontend + Backend (user history feature)

**Likely Cause:**  
The feature was planned but not implemented during the Beta phase due to prioritization of core workflows.

**Planned Action:**  
- Store search history per user  
- Create UI to display previous searches  
- Allow users to re-run a previous search with one click 

---

## Issue 5 — Limited Test Coverage for Edge Cases

**Priority:** Medium  

**Description:**  
While core workflows are covered, some edge cases are not fully tested.

**Affected Area:**  
Frontend and backend test suites

**Likely Cause:**  
Focus on core functionality during Beta phase.

**Planned Action:**  
- Add tests for edge cases  
- Add more negative and failure scenario tests  
- Expand integration coverage  

---

## Summary

All remaining issues are considered non-critical for Beta release.

- Medium priority issues affect usability and should be addressed before final release
- Low priority issues are feature enhancements that can be deferred

The system is stable and functional for Beta, with all core workflows supported and tested.