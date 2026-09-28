import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

/* One HTML entry per page, so every page has a real URL (/services/,
   /about/ …) and the build runs on any static host with no rewrites. */
const page = (p: string) => fileURLToPath(new URL(p, import.meta.url))

/* Where the site is served from. "/" for a domain root; GitHub Pages serves a
   project site under /<repo>/, so the deploy workflow sets BASE_PATH. */
const base = process.env.BASE_PATH || '/'

/* Vite already prefixes scripts, styles and icons in the HTML with `base`;
   this catches the rest (the preload hint and the social-share image). */
const baseInHtml = (): Plugin => ({
  name: 'base-in-html',
  transformIndexHtml: (html) => (base === '/' ? html : html.replace(/(href|content)="\/assets\//g, `$1="${base}assets/`)),
})

export default defineConfig({
  base,
  appType: 'mpa',
  plugins: [react(), tailwindcss(), baseInHtml()],
  build: {
    rollupOptions: {
      input: {
        home: page('./index.html'),
        services: page('./services/index.html'),
        about: page('./about/index.html'),
        gallery: page('./gallery/index.html'),
        contact: page('./contact/index.html'),
      },
    },
  },
})
