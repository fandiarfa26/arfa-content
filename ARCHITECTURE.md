# ARCHITECTURE.md

# Tech Stack

## Frontend

* SvelteKit 5
* Tailwind CSS v4
* shadcn-svelte

## Backend

* SvelteKit Server

## Database

* Supabase PostgreSQL

## ORM

* Drizzle ORM

## Deployment

* Vercel

---

# Architecture

Browser
↓
SvelteKit Server
↓
Drizzle ORM
↓
Supabase PostgreSQL

---

# Authentication

Single password.

Flow:

Login Page
↓
Validate Password
↓
Create Cookie Session
↓
Access Application

---

# Database Tables

## contents

* id
* title
* category
* hook
* problem
* experience
* lesson
* cta
* caption
* hashtags
* upload_date
* reels_url
* tiktok_url
* weekly_plan_id
* created_at
* updated_at

---

## weekly_plans

* id
* start_date
* end_date
* created_at

---

# Computed Status

Idea:

* title only

Ready:

* category
* hook
* problem
* experience
* lesson
* cta

Planned:

* weekly_plan_id

Published:

* reels_url OR tiktok_url

---

# Routes

/

Dashboard.

/backlog

Kanban.

/content/[id]

Editor.

/weekly-plan

Weekly planning.

/recap

Generator.

---

# Server Actions

* createContent
* updateContent
* deleteContent
* createWeeklyPlan
* assignWeeklyPlan
* generateRecap

---

# Security

* Password stored in environment variable.
* Session cookie.
* Protected routes.
* No public CRUD access.

---

# Deployment

Frontend:

Vercel.

Database:

Supabase.

Environment:

* APP_PASSWORD
* DATABASE_URL

---

# Risks

## Low Risk

* CRUD
* Dashboard
* Editor

## Medium Risk

* Weekly planning
* Recap formatting

Overall complexity:

4/10

Suitable for solo development.

