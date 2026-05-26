# Crown FM Website

Marketing site for Crown FM, a facilities management business. Built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Useful commands

| Command            | What it does                                |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Start the local dev server with hot reload  |
| `npm run build`    | Build the static site into `./dist/`        |
| `npm run preview`  | Preview the production build locally        |

## Project structure

```
src/
  layouts/      Shared page shells (header, footer, <head>)
  pages/        Each .astro file becomes a route
  styles/       Global CSS + Tailwind theme tokens
public/         Static assets served as-is (favicon, images, robots.txt)
```

See `CLAUDE.md` for context on how to work on this codebase with Claude Code.
