# Crown FM Website — Working Notes for Claude Code

## What this is

Marketing website for **Crown FM**, a **facilities management** business
(building maintenance, compliance, reactive callouts — *not* a radio
station, despite the "FM" in the name).

Audience is **B2B**: facilities managers, office managers, and procurement
people at the businesses Crown FM wants as clients. Tone should be
professional, confident, and concrete — no marketing fluff, no emoji.

## Tech stack

- **Astro 5** with TypeScript (strict)
- **Tailwind CSS 4** via the `@tailwindcss/vite` plugin (no `tailwind.config.js`
  — theme tokens live in `src/styles/global.css` under `@theme`)
- **@astrojs/sitemap** for SEO
- Static output by default (no SSR yet — keep it that way unless we add
  a feature that genuinely needs a server)

## Project conventions

- Pages live in `src/pages/` — one `.astro` file per route.
- All pages should use `BaseLayout.astro` so header, footer, fonts, and
  `<meta>` stay consistent.
- Use Tailwind utility classes; reach for the `brand-*` colour tokens
  (defined in `global.css`) for anything brand-coloured rather than
  hardcoding hex values.
- Keep components small and presentational. No client-side JavaScript
  unless a page genuinely needs interactivity (Astro ships zero JS by
  default — preserve that).
- Copy is content, not code — keep it in the `.astro` files for now;
  we can migrate to Content Collections if it grows.

## Running locally

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static build into ./dist
```

## Things still to do (good first tasks)

- Replace placeholder copy on the homepage with real Crown FM messaging
- Build out `/services`, `/about`, `/contact` pages (currently linked but
  not created)
- Add a real contact form (Netlify Forms or Formspree — pick one when
  we decide on hosting)
- Swap the placeholder favicon for the real Crown FM logo
- Fill in the production URL in `astro.config.mjs` (currently a
  placeholder)
- Decide brand colours and update the `--color-brand-*` tokens in
  `src/styles/global.css`

## Things NOT to do

- Don't add a heavy CMS or database — this is a brochure site.
- Don't add React/Vue/Svelte integrations unless we hit something
  Astro alone can't do.
- Don't put secrets in this repo. There aren't any yet, but if we add
  a contact form provider, the API key goes in `.env` (gitignored).
