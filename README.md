# reup.sa

Marketing site for REUP, a Saudi multi-tenant business platform. Arabic is the default (`/`, RTL) and English lives at `/en`.

Stack: Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Motion, Phosphor Icons, IBM Plex Sans Arabic + IBM Plex Mono via `next/font`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/app/(ar)` and `src/app/(en)/en`: one root layout per language, so `<html lang dir>` is correct on first paint.
- `src/lib/content.ts`: every visible string for both languages, plus partner logos and contact details.
- `src/components/*`: one file per section. Client components (`"use client"`) are kept to the interactive pieces: tenant preview, brand demo, payments feed, solution tabs, steps, FAQ, contact form.
- `src/app/globals.css`: design tokens (light and dark), button styles, motion easings, marquee, accordion.
- `src/app/api/contact/route.ts`: validates demo requests. It only logs today.

## Design rules

- Brand: indigo `#201751` is the ink, raspberry `#D6005A` is the single accent.
- Radius: buttons are pills, surfaces 20px, large media 24 to 28px, inputs 12px.
- Motion uses `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. UI transitions stay under 300ms, exits are faster than entries, and everything respects `prefers-reduced-motion`.
- Arabic text never gets letter-spacing. Digits are Western in both languages.

## Before launch

- Connect `src/app/api/contact/route.ts` to the sales inbox or CRM.
- Confirm platform claims in `content.ts` (payments methods, FATOORA Phase 2, data isolation, custom domains) match what the product ships.
- Confirm the Arabic spelling of the testimonial author's name.
- Images and logos are loaded from `https://reup.sa/images`. Move them into `public/` if the old asset host will go away.
- Dashboard numbers in the hero, invoice and payments feed are illustrative sample data.
