# PRD.md

# Arfa Content

## Overview

Arfa Content adalah aplikasi web personal untuk mengelola ide konten, proses pembuatan konten, dan pembuatan recap mingguan untuk series konten `npm run test`.

Aplikasi ini dibuat khusus untuk workflow pribadi dan bukan produk publik maupun SaaS.

---

# Problem Statement

Saat membuat konten secara rutin, terdapat beberapa masalah:

* Ide konten mudah terlupakan.
* Sulit menentukan konten yang akan dibuat minggu ini.
* Materi konten tersebar di berbagai tempat.
* Pembuatan recap mingguan masih dilakukan secara manual.
* Sulit melihat progres series konten.

---

# Goals

* Menyimpan ide dengan cepat.
* Mengelola proses pembuatan konten.
* Menyimpan struktur isi konten.
* Menyimpan caption dan hashtag.
* Melacak konten yang telah dipublikasikan.
* Menghasilkan recap mingguan.

---

# Target User

Pemilik aplikasi sendiri.

Single user.

---

# Workflow

Idea Capture
↓
Content Enrichment
↓
Weekly Plan
↓
Recording & Upload
↓
Published
↓
Generate Recap

---

# Content Lifecycle

## Idea

Hanya title.

## Ready

Category dan struktur konten telah diisi.

## Planned

Konten telah dimasukkan ke Weekly Plan.

## Published

Konten memiliki minimal satu URL publikasi.

Status bersifat computed dan tidak disimpan di database.

---

# Content Data

## Required

* Title

## Enrichment

* Category
* Hook
* Problem
* Experience
* Lesson
* CTA
* Caption
* Hashtags

## Publish

* Upload Date
* Reels URL
* TikTok URL

---

# Categories

* npm
* run
* test

Warna:

* npm → hijau
* run → biru
* test → kuning
* lainnya → abu-abu

---

# Weekly Plan

Satu konten hanya boleh berada pada satu minggu.

Contoh:

22/06 - 27/06

* Portfolio rebuild
* Morning run session
* JavaScript fundamentals

---

# Weekly Recap

CLI output:

$ npm run test

PASS portfolio rebuild
SKIP morning run session
PASS JavaScript fundamentals

Tasks: 2 passed, 1 skipped
Duration: 22/06 - 27/06

Continue next week...

---

# MVP Features

## Dashboard

* Total ideas
* Total ready
* Total planned
* Total published
* Category distribution
* Active weekly plan

## Quick Capture

Menambahkan ide hanya dengan title.

## Backlog

Kanban berdasarkan status.

## Weekly Plan

Menentukan target mingguan.

## Content Editor

* Category
* Hook
* Problem
* Experience
* Lesson
* CTA
* Caption
* Hashtags

## Publishing

* Upload Date
* Reels URL
* TikTok URL

## Recap Generator

* CLI recap
* Threads recap
* Copy button

---

# Out of Scope

* AI generator
* Scheduler
* Reminder
* Analytics
* Calendar
* Multi user
* Social media integration
* Auto posting
* Collaboration

---

# Product Positioning

Arfa Content bukan:

* Social media management tool
* Content scheduler
* Notion replacement

Arfa Content adalah:

Personal Content Operating System untuk workflow series konten `npm run test`.

