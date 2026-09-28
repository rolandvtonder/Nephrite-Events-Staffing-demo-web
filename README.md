# Nephrite Events & Staffing — website

Five-page site for Nephrite Events & Staffing (Cape Town & Johannesburg):
Home, Services, About, Gallery and Contact.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # static site in dist/, upload to any web host
```

## Where things live

- `src/site.ts` — all copy, contact details, services, staff roles and gallery captions
- `src/pages/` — one component per page; `src/entries/` + the `*/index.html` files mount them
- `public/assets/` — web-ready photos and logo
- `media/` — the original photos and logo they were made from

## Publishing (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to https://rolandvtonder.github.io/Nephrite-Events-Staffing-demo-web/.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is served under `/<repo>/`, so the workflow builds with `BASE_PATH`
set to that. Internal links and images go through `u()` in `src/site.ts` so
they pick the prefix up; use it for any new path.
