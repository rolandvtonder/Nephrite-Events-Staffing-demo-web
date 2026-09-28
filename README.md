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
