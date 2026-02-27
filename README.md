# Focura Waitlist Landing

Single-page waitlist landing for the iOS Focura app.

## Stack

- Next.js (App Router, TypeScript)
- Supabase (waitlist persistence)
- Resend API (thank-you email)
- Plausible (conversion analytics)

## Setup

1. Copy env template:

```bash
cp .env.example .env.local
```

2. Fill required variables in `.env.local`.

3. Apply SQL schema in Supabase:

- File: `supabase/schema.sql`

4. Run locally:

```bash
npm install
npm run dev
```

## API Contract

`POST /api/waitlist`

Request body:

```json
{
  "email": "you@example.com",
  "source": "landing-main-cta"
}
```

Possible responses:

- `200 { "ok": true }`
- `409 { "ok": false, "reason": "duplicate" }`
- `400 { "ok": false, "reason": "invalid_email" }`
- `429 { "ok": false, "reason": "rate_limited" }`

## Notes

- Honeypot field is used for basic bot filtering.
- Rate-limit is in-memory for MVP.
- Plausible event name: `waitlist_signup`.
