# Step-by-Step Demo Script

The following is a 5–7 minute MVP demo path.

**Step 1 — Access Homepage (0:00–1:00)**

1. Open the deployed application URL
2. Confirm the homepage loads successfully
3. Confirm the destination suggestion form is visible above the fold
4. Briefly explain:
   - Required fields
   - Optional preference fields

**Checkpoints:**

- No console errors
- Page renders cleanly
  
##

**Step 2 — Enter Preferences (1:00–2:30)**

Use these pre-tested demo inputs:

* Origin City (Required): Atlanta
* Budget (Optional): Low
* Vibe (Optional): Relaxing
* Travel Interest: Beach
* Leave one optional field blank to demonstrate flexibility

Narration: “Optional fields refine the recommendation engine but are not required.”

## 

**Step 3 — Validate Form Behavior (2:30–3:30)**

1. Clear required field

2. Click Submit

3. Confirm validation error appears

4. Re-enter required field correctly

5. Click Submit again

Expected:
- Error message displays
- No navigation until valid
- No console errors

## 

**Step 4 — View Destination Suggestions (3:30–5:00)**

System navigates to Results Page.

Verify:

* Destination list appears
* Each suggestion contains:
    * Destination name
    * Short description
    * Representative image
    * Estimated budget 

Narration: “Results reflect the selected preferences using predefined mapping logic.”

## 

**Step 5 — Update Dates & Travelers (5:00–6:30)**
1. Modify travel dates

2. Adjust traveler count

3. Confirm results refresh dynamically

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
