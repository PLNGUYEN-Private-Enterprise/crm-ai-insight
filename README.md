# CRM AI Insight

Marketing site for two services:

1. **Salesforce Implementation** — `/services/salesforce-implementation`
2. **n8n Flows & AI Services** — `/services/n8n-and-ai`

Built with Next.js (App Router) and Tailwind CSS v4, deployed to Cloudflare Workers through the
[OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare) using the existing `wrangler.jsonc`.
Every page is prerendered; the only server code is the contact form's Server Action.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run preview    # production build running in the Workers runtime (workerd) at http://localhost:8787
```

## Deploying

`wrangler.jsonc` has a custom build (`npm run build:worker`) that Wrangler runs before every
`wrangler deploy`, `wrangler versions upload` and `wrangler dev`. It builds the app with OpenNext and copies
the prerendered pages into Workers static assets (the read-only static-assets incremental cache configured in
`open-next.config.ts`), so pages are served without rendering.

That means the **Workers Builds defaults work as-is** — no build command, deploy command `npx wrangler deploy`,
non-production branches `npx wrangler versions upload` — and so do `npm run deploy` / `npm run upload`.
A merge to the production branch builds and deploys the site.

```bash
npm run deploy     # wrangler deploy (builds first)
npm run upload     # wrangler versions upload — a preview version without promoting it
```

Use these (or plain `wrangler`) rather than `opennextjs-cloudflare deploy|preview|upload`: those call Wrangler,
which would run the custom build a second time.

> **Next.js is pinned to 16.3.8.** Next 16.4.0 loads `server/preview-props.json` at runtime, which
> `@opennextjs/cloudflare` 1.20.10 does not inline, so every request fails with
> `Unexpected loadManifest(/.next/server/preview-props.json) call!`. Upgrade once the adapter supports it,
> and verify with `npm run preview`.

## Configuration

| Variable                    | When            | Required | Purpose                                                                          |
| --------------------------- | --------------- | -------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | build           | yes      | Public origin (e.g. `https://www.example.com`) for canonical, Open Graph, sitemap |
| `NEXT_PUBLIC_BOOKING_URL`   | build           | no       | Cal.com/Calendly link. When set, "Book a discovery call" opens it                 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build           | no       | Shown beside the contact form and in the footer                                   |
| `CONTACT_WEBHOOK_URL`       | runtime secret  | yes      | Where contact form submissions are POSTed (e.g. an n8n Webhook node)              |
| `CONTACT_WEBHOOK_SECRET`    | runtime secret  | no       | Sent as the `X-Webhook-Secret` header so the webhook can reject other callers     |

- Build variables go in Workers Builds → _Build variables and secrets_ (or `.env.local` for `npm run dev`).
- Runtime secrets: `npx wrangler secret put CONTACT_WEBHOOK_URL` (or `.dev.vars` for `npm run preview`).
- See `.env.example` for the full list.

Without `CONTACT_WEBHOOK_URL` the form shows a friendly "isn't available right now" message instead of losing
the inquiry silently.

### Contact form → n8n

The form posts this JSON to `CONTACT_WEBHOOK_URL`; respond with any 2xx status:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines",
  "message": "We need lead routing from three web forms into Salesforce.",
  "interests": ["Salesforce Implementation"],
  "page": "/services/salesforce-implementation",
  "source": "website",
  "submittedAt": "2026-10-10T15:50:21.132Z"
}
```

A natural first flow: **Webhook** (Header Auth on `X-Webhook-Secret`) → **Salesforce: Create Lead** →
**Slack/Email: notify**. Spam protection is a hidden honeypot field; add a Cloudflare WAF rate-limiting
rule on `POST /*` if volume becomes a problem.

## Editing content

All copy lives in plain TypeScript, separate from layout:

| File                          | Contents                                                             |
| ----------------------------- | -------------------------------------------------------------------- |
| `src/content/site.ts`         | Brand name, legal name, description, navigation, CTA                 |
| `src/content/services.ts`     | Both services: tagline, highlights, problems, capabilities, steps, FAQs |
| `src/content/home.ts`         | Example workflows, process, principles, home FAQ                     |
| `src/lib/contact-shared.ts`   | Contact form interest options and field limits                       |

Service pages are generated from `services.ts`. To split AI into its own service later, add an entry there,
link it in `navigation` (`site.ts`), and add an interest option in `contact-shared.ts`.

## Design system

- Tokens live in `src/app/globals.css` (`--sf` blue for Salesforce, `--ai` coral for n8n & AI) with light and
  dark themes via `prefers-color-scheme`. Every text pair meets WCAG AA contrast.
- Type: Geist Sans and Geist Mono, self-hosted via the `geist` package (no build-time font downloads).
- Accessibility: skip link, landmark structure, visible focus, native `<details>` FAQs, labelled form fields with
  inline errors, focus moved to the confirmation after sending, `prefers-reduced-motion` respected. The form also
  works without JavaScript.

## Project structure

```
src/
  app/
    layout.tsx                 # header, contact section, footer, metadata
    page.tsx                   # home
    services/[slug]/page.tsx   # service detail pages
    not-found.tsx, robots.ts, sitemap.ts, icon.svg, opengraph-image.png
  components/                  # UI building blocks (header, flow visual, cards, FAQ, contact form)
  content/                     # all copy
  lib/contact.ts               # Server Action → webhook
open-next.config.ts            # OpenNext: static-assets incremental cache
wrangler.jsonc                 # Cloudflare Worker config
```
