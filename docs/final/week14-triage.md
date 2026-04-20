# Week 14: Final Bug Triage & Fix Progress

## Overview

This document prioritizes remaining issues, bugs, technical debt, and UI polish items before the final release.  
The goal is to help the team focus on what must be completed under time constraints and ensure a stable release candidate.

---


## Issues List

### 1. Flight Search API Instability
- **Severity:** Critical  
- **Description:** Flight search endpoint relies on external API which may return 401/429 errors causing inconsistent results  
- **Component:** Backend (flightController.js)  
- **Owner:** Keenan 
- **Disposition:** Add better error handling and fallback (Week 15)  
- **Impact:** Causes unreliable flight search results and may break core functionality during demo

---

### 2. Compare Flights Limited to Frontend Only
- **Severity:** Important  
- **Description:** Compare feature is stored only in localStorage and not persisted across devices or sessions  
- **Component:** Frontend (CompareFlightsModal.jsx)  
- **Owner:** Zengtao
- **Disposition:** Consider backend support if time allows (Week 16)  

---

### 3. Flight Search Inconsistency After Destination Selection

- **Severity:** Critical  
- **Description:** Searching for flights directly from the homepage works correctly. However, if a user first selects a destination from the dropdown and then performs a flight search, the first attempt does not return results. After refreshing the page, the same search works as expected.  
- **Component:** Frontend (Search flow, state management, routing)  
- **Owner:** Keenan
- **Disposition:** Planned for Week 15. Fix will ensure search parameters are fully updated before triggering the API call (e.g., improving state synchronization or useEffect dependencies)  
- **Impact:** Affects reliability of primary user workflow and may confuse users

---

### 4. Inconsistent Flight Data Between Search and Saved Flights

- **Severity:** Important  
- **Description:** Search results currently display incomplete flight segment information, while saved flights show full multi-segment data. This leads to inconsistency in user experience and confusion when comparing search results with saved flights.  
- **Component:** Backend + Frontend  
- **Owner:** Full Stack
- **Disposition:** Planned for Week 15. Backend will be updated to return full segment data (all legs), and frontend will be adjusted to display complete routes consistently   

---

### 5. Missing DELETE Endpoint for Saved Flights

- **Severity:** Critical  
- **Description:** Users currently cannot remove saved flights due to the absence of a DELETE endpoint in the backend. This blocks a core user workflow and leads to poor user experience.  
- **Component:** Backend (flightRoutes.js, flightController.js)  
- **Owner:** Keenan
- **Root Cause:** DELETE API for saved flights has not yet been implemented  
- **Disposition:** Planned for Week 15. Will implement DELETE /api/flights/:id endpoint and update frontend to support removal 

---

### 6. Poor UX for Multi-Segment Flights
- **Severity:** Important  
- **Description:** UI initially displayed only first segment of flights, hiding layovers  
- **Component:** Frontend (FlightResultsView.jsx)  
- **Owner:** Zengtao
- **Disposition:** Planned for Week 15.

---

### 7. Compare UI Could Be More Intuitive
- **Severity:** Optional  
- **Description:** Compare feature works but UI can be improved (e.g., highlight best option, animations)  
- **Component:** Frontend  
- **Owner:** Quynh
- **Disposition:** Optional polish (Week 16)  

---

### 8. Lack of Mocking in Flight API Tests
- **Severity:** Important  
- **Description:** Tests rely on real external API causing flaky CI results  
- **Component:** Backend Tests  
- **Owner:** Quynh 
- **Disposition:** Add axios mocking (Week 15)  

---

### 9. Minor UI Alignment and Styling Issues
- **Severity:** Optional  
- **Description:** Some spacing and layout inconsistencies across pages  
- **Component:** Frontend  
- **Owner:** Quynh
- **Disposition:** UI polish (Week 16)  

---

### 10. Compare Flights Feature Implementation
- **Severity:** Critical
- **Description:** Implemented compare functionality with UI and state management  
- **Component:** Frontend
- **Resolution:** Completed this week
- **PR:** https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-5/pull/112

---

## Summary

- Critical issues must be resolved before the final presentation, especially backend stability and core user workflows  
- Important issues are targeted for Week 15 to improve usability and reliability  
- Optional issues are deferred to Week 16 for UI polish and user experience enhancements  

This prioritization ensures the team focuses on delivering a stable and functional release candidate under time constraints.