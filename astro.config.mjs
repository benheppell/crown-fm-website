// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind removed 2026-08-24: the codebase uses zero utility classes.
// If a genuine one-off need appears, add it back as a considered
// decision rather than a maybe.
export default defineConfig({
  site: 'https://www.crown-fm.co.uk',
  integrations: [sitemap()],
});
