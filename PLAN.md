# Implementation Plan — Arfa Content MVP

## Task 1: Project Init
Inisialisasi SvelteKit 5 + Tailwind v4 + shadcn-svelte + Drizzle ORM + Supabase setup.

## Task 2: Database Schema
Setup schema `contents` dan `weekly_plans` dengan Drizzle + migrations + seed.

## Task 3: Authentication
Single password: login page, validate with `APP_PASSWORD` env, session cookie, route protection.

## Task 4: Layout
Sidebar navigasi (Dashboard, Backlog, Weekly Plan, Recap). Responsive: sidebar collapsible, mobile bottom nav.

## Task 5: Dashboard
Statistik total per status, category distribution chart/bar, active weekly plan, quick capture form.

## Task 6: Quick Capture + FAB
Form title-only di dashboard + Floating Action Button (mobile). Submit → create content dengan status Idea.

## Task 7: Computed Status Helper
Pure function `getStatus(content)`:
- `reels_url` or `tiktok_url` → Published
- `weekly_plan_id` → Planned
- `category && hook && problem && experience && lesson && cta` → Ready
- else → Idea

## Task 8: Backlog Kanban
4 kolom (Idea / Ready / Planned / Published). Card: judul + colored left border. Pindah otomatis sesuai data. Sort `updated_at DESC`.

## Task 9: Content Editor
Single long page: title, category, hook, problem, experience, lesson, cta, caption, hashtags, upload_date, reels_url, tiktok_url. Save → update.

## Task 10: Weekly Plan
Create plan (start_date, end_date). Multi-select checklist — hanya konten Ready yang bisa dipilih. Assign/unassign.

## Task 11: Recap Generator
CLI-style output (PASS/SKIP per konten). Threads output (part 1 CLI, next parts: judul + ringkasan + URL). Copy button.

## Task 12: Deployment
Vercel config, env vars (`APP_PASSWORD`, `DATABASE_URL`), vercel.json.
