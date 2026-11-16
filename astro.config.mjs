// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The site is served from a custom domain (see public/CNAME), so no `base` is needed.
export default defineConfig({
  site: 'https://dimitrios-papakonstantinou.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
