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

## Site structure

The site is intentionally a **single-page experience**. All real content
lives on the homepage (`src/pages/index.astro`) split into sections —
Hero, Who We Are (`#about`), Services (`#services`), Tagline, Clients,
Testimonial, Accreditations, Contact (`#contact`), FAQ (`#news`). The
nav links to anchors on that page.

The files at `src/pages/services.astro`, `about.astro`, and
`contact.astro` are deliberately tiny **meta-refresh stubs** — there
purely as a safety net under the Netlify redirects in `netlify.toml`,
which force `/services` → `/#services` etc. They can be deleted once
the redirect rules are clearly working.

## Project conventions

- All pages use `BaseLayout.astro` so the topbar, sticky header (with
  Soft FM / Hard FM dropdowns), and dark footer stay consistent.
- Styling is **vanilla CSS** in `src/styles/global.css`, organised by
  section with shared CSS custom properties at the top (`--gold`,
  `--black`, `--off-white`, etc.). Class naming roughly follows BEM
  (`.service-card`, `.service-card__head`, `.service-card__link`).
- **Tailwind is still imported** at the top of `global.css` (the project
  was originally scaffolded with it). It's harmless to leave; reach for
  it only if a one-off utility class is genuinely simpler than writing
  CSS. New work should follow the existing class-based pattern, not
  utility soup.
- Typefaces: `Cinzel` for display headings, `Outfit` for body — loaded
  from Google Fonts in `global.css`.
- Client-side JS lives in `public/js/main.js` (FAQ accordion, mobile
  nav toggle, scroll-reveal IntersectionObserver). Loaded once from
  `BaseLayout.astro` with `is:inline` so Astro doesn't try to bundle it.
- Copy is content, not code — keep it in the `.astro` files for now;
  we can migrate to Content Collections if it grows.

## Brand

- Colours: black `#0a0a0a`, gold `#c9a54e` (with `--gold-light` and
  `--gold-dark` variants), off-white `#f8f7f4`.
- Section pattern alternates: dark hero → white about → off-white
  services → dark tagline → white clients → dark testimonial → white
  accreditations → off-white contact → white FAQ → dark footer. Hold
  that rhythm when adding new sections.
- Headings use Cinzel, wide letter-spacing (`2–7px` depending on size),
  uppercase. `<em>` inside an `<h1>` / `<h2>` is the convention for a
  gold accent word.
- Section labels use the `.section-label` class — uppercase, 11px,
  letter-spacing 6px, gold. Pair with `.gold-rule` underneath for the
  signature look.

## Running locally

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static build into ./dist
```

## Hosting

- Deployed via **Netlify**, connected to the GitHub repo
  `benheppell/crown-fm-website`. Every push to `main` triggers a build
  and deploy automatically.
- Build settings on Netlify: build command `npm run build`, publish
  directory `dist`, branch `main`.
- The contact form on `/contact` uses **Netlify Forms** — submissions
  show up under the site's "Forms" tab in the Netlify dashboard. No
  third-party form provider is wired in.

## Things still to do (good first tasks)

- Point the `crownfm.co.uk` domain at the Netlify site (currently still
  served on the random `*.netlify.app` URL).
- Drop in real assets: company logo to replace the chess-king Unicode
  glyph in the header/footer, hero video for the dark hero background
  (currently a CSS gradient placeholder), and a real "team on site"
  photo in the Who We Are section (currently a faded gold crown
  watermark).
- Swap the placeholder client names (Barratt Homes / Redrow / etc.) for
  real Crown FM clients with permission to be listed.
- Replace the placeholder testimonial with a real attributable quote.
- Delete `src/pages/services.astro`, `about.astro`, and `contact.astro`
  once we've confirmed the Netlify forced redirects are reliable.

## Things NOT to do

- Don't add a heavy CMS or database — this is a brochure site.
- Don't add React/Vue/Svelte integrations unless we hit something
  Astro alone can't do.
- Don't put secrets in this repo. There aren't any yet, but if we add
  a contact form provider, the API key goes in `.env` (gitignored).
