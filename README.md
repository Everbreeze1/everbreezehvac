# everbreezehvac.com

Website for Everbreeze Heating And Air®, Sacramento.

- **Framework:** Next.js (App Router), Tailwind CSS. Every marketing page is statically generated, so search engines see full content.
- **Hosting:** Vercel.
- **Leads:** `/api/leads` saves each quote request and booking to Supabase (`supabase/migrations`), emails an alert through Resend, sends the customer a confirmation, and (optionally) adds bookings to the Google Calendar that Markate syncs from.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev
```

The site runs without any environment variables; forms will show an error until Supabase or Resend is configured.

## Editing content

| What | Where |
| --- | --- |
| Phone, email, hours, license #, address | `src/lib/site.ts` |
| Services (copy, FAQs, photos) | `src/lib/services.ts` |
| Service-area cities | `src/lib/areas.ts` |
| General FAQs and SMUD rebate tiers | `src/lib/faqs.ts` |
| Blog posts | `src/lib/blog.ts` |
| Redirects from old URLs | `next.config.ts` |

## Setup checklist

1. Create a Supabase project and run `supabase/migrations/*.sql` in its SQL editor.
2. Create a Resend account, verify `everbreezehvac.com`, and create an API key.
3. Import this repo in Vercel and add the variables from `.env.example`.
4. (Optional) Google Places API key + Place ID for live reviews.
5. (Optional) Google service account with access to the Markate-synced calendar.
6. Point the domain's DNS at Vercel.
