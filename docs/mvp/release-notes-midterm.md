# Midterm Release – v1.0.0

## Release Tag
midterm-v1.0.0

---

# Overview

This release represents the Midterm MVP checkpoint.

The core MVP functionality is an attribute-based destination recommendation system with a real backend connected to MongoDB.

The system runs end-to-end and supports a reproducible demo path.

---

# What’s Included in This Build

## 1. Attribute-Based Recommendation Engine (Fully Functional)

- Attributes are fetched from backend (`GET /api/attributes`)
- User selects one or more attributes
- Backend filters destinations using MongoDB
- Results are dynamically rendered on the results page

This is the official vertical slice implemented for midterm.

---

## 2. Backend Integration

- Node/Express backend
- MongoDB Atlas connection (real database, not mock)
- `/api/search` endpoint for filtered results
- JSON contract validated during testing

---

## 3. Validation Behavior

- Required field validation on attributes page
- Modal-based error handling (no page navigation until valid)
- No console errors during demo flow

---

## 4. UI Components (Prototype-Level)

The following components are included as UI groundwork for future expansion:

- Flight Search Card (layout + validation only)
- Travel date and traveler input fields

# Known Issues / Limitations

- No real-time flight API integration
- No ranking algorithm
- No authentication
- No pagination
- No external third-party APIs
- Flight search card is UI-only

---

# How to reproduce the demo path

## 1. Clone repository

```bash
git clone <repo-url>
cd term-project-group-5
```
## 2. Start system (Docker)

```bash
docker-compose up --build
```
Frontend:
    http://localhost:5173
Backend:
    http://localhost:5001

## 3. Demo Path (Reproducible)

- Open homepage

- Click “Start Here” under "Find Your Next Destination" → Go to Attributes Page

- Select at least one attribute

- Click "Find My Destination"

- System returns filtered destinations from real MongoDB

