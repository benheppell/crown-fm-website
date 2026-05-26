// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://crownfm.example.com', // TODO: replace with the real production URL
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
