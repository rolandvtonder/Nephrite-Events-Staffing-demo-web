import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

/* One HTML entry per page, so every page has a real URL (/services/,
   /about/ …) and the build runs on any static host with no rewrites. */
const page = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss()],
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
