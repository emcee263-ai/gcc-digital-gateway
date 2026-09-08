# GCC Digital Gateway

Gweru City Council Digital Service Platform prototype built with Next.js.

## What is updated in this version

- Gweru City Council crest added to the landing page, login, navigation and digital bill.
- Cool civic visual system inspired by Gweru's crisp/cold atmosphere: slate, ice blue, deep teal and restrained crest red/gold accents.
- Billing screen redesigned as an upgraded digital version of the supplied hardcopy municipal bill.
- Digital statement includes account details, meter readings, transaction lines, ageing buckets, amount due, payment information and print/save-to-PDF support.
- Billing history retained beneath the statement.
- Resident demo account aligned with the new sample statement data.
- `/requests/new` production build issue fixed by wrapping `useSearchParams()` in `Suspense`.
- Next.js updated from 14.2.15 to patched 14.2.35 for the current 14.x release line.

## Demo accounts

- resident@gcc.demo
- clerk@gcc.demo
- finance@gcc.demo
- admin@gcc.demo

Any password works in this prototype.

## Local development

```bash
npm install
npm run dev
```

## Deployment

Push the project to GitHub and import the repository into Vercel as a Next.js project. The repository root is the project root; no custom root directory is required.

## Storage note

JSON files in `data/` are mock storage for the prototype. Vercel's filesystem is not a durable production database. A later production phase should move residents, billing, requests, notices and audit data to a persistent database such as PostgreSQL/Supabase.
