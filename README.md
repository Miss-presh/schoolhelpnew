# Schoolhelphub

Marketing site for Schoolhelphub — an online tutoring service for students aged 5–16
across Nigeria, the UK, and the US. Built with Next.js (App Router), React, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.


## Project Structure

```
app/
  (marketing)/       # Marketing pages: about, services, tutors, pricing, contact, etc.
  api/                # Route handlers (book-trial, contact) that forward to Google Sheets
  page.tsx            # Homepage
components/
  marketing/          # Hero, pricing table, student photos, testimonials, etc.
context/
  CurrencyContext.tsx # GBP/NGN currency toggle used across pricing displays
```

## Scripts

| Command         | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`     | Start the local dev server            |
| `npm run build`   | Production build                      |
| `npm run start`   | Serve the production build            |
| `npm run lint`    | Run ESLint                            |

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers a production
deployment — make sure the environment variables above are also set in the Vercel
project settings, not just locally.
