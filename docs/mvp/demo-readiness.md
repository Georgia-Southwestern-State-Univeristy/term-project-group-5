# Step-by-Step Demo Script

The following is a 5–7 minute MVP demo path.

**Step 1 — Access Homepage (0:00–1:00)**

1. Open the deployed application URL
2. Confirm the homepage loads successfully
3. Briefly provide an overview of the "Find Flight" section at the top of the page that is currently just a placeholder for a feature that is scheduled for a future sprint, and explain the fields within this section.
5. Discuss the "Find Your Next Destination" section at the bottom of the page.
6. Click on the "Start Here" button to navigate to the next page to the "Search Preferences" or destination suggestion form.


**Checkpoints:**

- No console errors
- Page renders cleanly
  
##

**Step 2 — Validate Form Behavior (1:00–2:00)**

* On the "Search Preferences" page, attempt submission by clicking "Find My Destination" without selecting an option from any of the drop-down menus.
* System displays validation error message.

Expected:
- Error message displays
- No navigation until valid
- No console errors

## 

**Step 3 — Enter Preferences (2:00–3:30)** 

1. Select an option from at least one of the drop-down fields (e.g., vibe = “relaxing”).
2. Select an option from the remaining optional drop-down fields (e.g., budget = “moderate”).
3. Leave one drop-down menu unselected to demonstrate flexibility.
4. Click "Find My Destination".

Narration: “Optional fields refine the recommendation engine but are not required.”

## 

**Step 4 — View Destination Suggestions (3:30–5:00)**

System navigates to Results Page.

Verify:

* A search flight form is displayed at the top of the page where users can enter travel dates and the number of travelers using input fields.
* A list of destination suggestions is displayed at the bottom of the page below the search flight form.
* Each suggestion includes:
   * Destination name
   * Short description
   * Representative image
   * "View Details" button

Narration: “Results reflect the selected preferences using predefined mapping logic.”

## 

**Step 5 — Update Dates & Travelers (5:00–6:30)**
1. Enter departure and arrival destinations
2. Modify travel dates
3. Adjust traveler count
4. Confirm no page reload

Narration: “Users can refine their search without returning to the homepage.”

## 

**Step 6 — Close (6:30–7:00)**

Summarize:
* End-to-end flow works
* Validation enforced
* Dynamic updates supported
* Non-goals intentionally excluded

<br> 

----

## Known Issues

The following are what might break and how we would handle it.

1. Frontend–Backend API Contract Drift:
    * Risk: Mismatched request/response structure
   * Handling Plan:
      * Freeze API schema before demo
      * Validate JSON structure via Postman prior to demo
      * If failure occurs:
        * Switch to seeded static response mode
        * Explain integration layer under refinement
2. Integration Environment Misconfiguration
    * Risk: Port/proxy mismatch prevents API communication
    * Handling Plan:
      * Validate .env values before demo
      * Test locally and deployed version
      * Keep backup environment open in another tab
      * If failure occurs:
        * Switch to deployed backup
        * Explain environment validation process
3. Weak or Empty Destination Suggestions
    * Risk: Demo input produces empty results
    * Handling Plan:
      * Use predefined demo inputs only
      * Implement fallback results logic
      * Seed curated tagged data
    * If empty state occurs:
      * Show fallback logic explanation

<br> 

----

## Seed Data Plan

The following is the plan on how we ensure consistent demo data.

* Use curated destination dataset where each destination is tagged with:
  * Budget
  * Vibe
  * Season
* Store seed data in version-controlled JSON
* Do not rely on live third-party APIs
* Pre-test demo inputs against seed dataset

Seed Example Mapping:

To ensure repeatable demo outputs, the following curated dataset is used:

| Budget   | Vibe      | Season | Destination |
|----------|-----------|--------|------------|
| Low      | Relaxing  | Summer | Dest A     |
| Low      | Relaxing  | Summer | Dest B     |

This guarantees deterministic output.

<br> 

----

## Fallback Plan

The following are what we would do if environment fails.

Scenario A: Backend Down
* Switch frontend to mock data mode
* Continue demo using static data

Scenario B: Deployment Failure
* Run local environment
* Share screen of localhost version

Scenario C: Network Instability
* Pre-record 60-second backup walkthrough
* Continue demo with narration
