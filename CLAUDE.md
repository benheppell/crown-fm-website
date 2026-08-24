# Crown FM Website — Working Notes for Claude Code

## What this is

Marketing website for **Crown FM**, a **facilities management** business
(building maintenance, compliance, reactive callouts — *not* a radio
station, despite the "FM" in the name).

Audience is **B2B**: facilities managers, office managers, and procurement
people at the businesses Crown FM wants as clients. Tone: professional,
confident, concrete. No marketing fluff, no emoji, no em-dashes in body
copy (a well-known machine-drafted tell).

Live at **https://www.crown-fm.co.uk**.

## Tech stack

- **Astro 5** with TypeScript (strict)
- **Vanilla CSS** in `src/styles/global.css` — no Tailwind, no PostCSS
  layer, no Sass. Direction B design tokens as CSS custom properties at
  the top of the file.
- **@astrojs/sitemap** for SEO
- Static output (no SSR).
- Hosted on **Netlify** — every push to `main` on the
  `benheppell/crown-fm-website` GitHub repo triggers a build.

## Site structure

Single-page site. All content lives on `src/pages/index.astro`, split
into sections that the nav anchors to:

| id | Section | Ground |
| --- | --- | --- |
| — | Hero (video + headline) | warm-black |
| — | Badge strip (Why Crown FM) | cream |
| `#about` | Who we are + stats + on-site photo | white |
| `#services` | Hard FM (wide), Soft FM, Renovations | warm-cream |
| — | Tagline ("One team. Every trade.") | warm-black |
| `#coverage` | Areas we cover (map + copy) | cream |
| — | Testimonial (Balfour Beatty) | warm-black |
| — | Accreditations (11 logos) | white |
| `#contact` | Contact form + phone/email | cream |
| `#faq` | Common questions | white |
| — | Footer (nav + brand + copyright) | near-black |

Each service card has its own id (`#hard-fm`, `#soft-fm`,
`#renovations`) so nav and footer links target the specific card, not a
generic `#services` anchor.

`src/pages/services.astro`, `about.astro` and `contact.astro` are tiny
**meta-refresh stubs** — a safety net under the Netlify redirects in
`netlify.toml` which force `/services` → `/#services` etc. Deletable
once the redirects are confirmed to be reliable.

## Project conventions

- All pages use `BaseLayout.astro`. It renders the sticky header (logo
  + nav + burger on mobile), the dark topbar with email/phone/URL,
  and the near-black footer.
- CSS naming roughly follows BEM (`.service-card`, `.service-card__head`).
- Client-side JS lives in `public/js/main.js` — FAQ accordion (real
  buttons + `aria-expanded`), mobile nav toggle, scroll-reveal
  IntersectionObserver, parallax on hero + about photo (respecting
  `prefers-reduced-motion`), viewport-aware hero video source swap
  (mobile clip under 768px, desktop clip above).
- Fonts are loaded from Google Fonts via `preconnect` + `stylesheet`
  in `BaseLayout.astro`'s `<head>`, NOT via `@import` in the
  stylesheet — parallel fetch, not serial.
- Copy is content, not code — keep it in the `.astro` files.

## Brand (matches the shipped code)

- **Colours:**
  - `--black: #0d0d0c` (warm near-black)
  - `--charcoal: #161614` (dark panel — used sparingly)
  - `--black-deep: #080807` (footer)
  - `--gold: #d4af6e` (muted, warm)
  - `--gold-light: #e6c897` (hover state)
  - `--gold-dark: #a8843e` (accent on light grounds)
  - `--off-white: #f3eee2` (warm cream)
  - `--white: #ffffff`
  - Text: `--text: #1a1a17`, `--text-mid: #5b5a52` for body,
    `--text-light` reserved for large display only (fails AA at body).
- **Typography:** **Inter** for everything (400/500/600/700 only).
  Sentence case, negative tracking on display (`-0.035em` to
  `-0.045em`). `<em>` inside a heading is the convention for a gold
  accent word — the em is NOT italicised, just recoloured.
- **Section rhythm:** dark hero → cream badges → white about →
  cream services → dark tagline → cream coverage → dark testimonial
  → white accreditations → cream contact → white FAQ → near-black
  footer. Alternation is deliberate — don't run three darks in a row.
- **Gold accent is single and sparing.** One gold, one accent word
  per section, no gradient text, no glow.
- **Section eyebrows** (`.section-label`) appear on **three sections
  only**: Services, Areas we cover, Contact. Everywhere else the h2
  carries the section alone. Repeated eyebrows read as templated.

## Running locally

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static build into ./dist
```

## Hosting

- Deployed via **Netlify** from GitHub `benheppell/crown-fm-website`.
- Build command `npm run build`, publish `dist`, branch `main`.
- Domain `crown-fm.co.uk` is pointed. Google Workspace handles email
  (MX / SPF / DKIM records live at Squarespace).
- Contact form uses **Netlify Forms** — submissions in the "Forms" tab.

## Things NOT to do

- Don't bring back Cinzel or Outfit. The switch to Inter was
  deliberate; the site now uses one family end to end.
- Don't add a heavy CMS or database — this is a brochure site.
- Don't add React/Vue/Svelte integrations unless we hit something
  Astro alone can't do.
- Don't put secrets in this repo.
- Don't reach for em-dashes in body copy (they're the most reliable
  AI tell).
- Don't put the same layout three sections in a row. Vary the
  composition — coverage is intentionally map-left / text-right to
  break About's text-left / photo-right.
- Don't put dark tiles on the white About section again — the stat
  row is a hairline-divided strip on the ground, not floating cards.

## Design skills

`.claude/skills/` holds 24 design skills (motion work from Emil
Kowalski, taste rules from Taste). They load automatically when
working in this folder and should be treated as the default standard
for any UI work here.

For a redesign pass on the homepage, `redesign-existing-projects` and
`design-taste-frontend` are the relevant ones; for motion, `animate`
and `review-animations`. Impeccable (`/impeccable audit`,
`/impeccable polish`) installs separately — see `DESIGN-SKILLS.md`.

Whatever the skills suggest, the brand rules above win: Inter,
warm-black + cream + muted gold, alternating section rhythm.
