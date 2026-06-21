import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  // Your site will be hosted at: https://rishiram-ramachandran.github.io/rishi-flims/
  site: 'https://rishiram-ramachandran.github.io',
  base: '/rishi-flims',
  output: 'static',
  vite: {
    ssr: {
      external: ['@astrojs/prism']
    },
    plugins: [tailwindcss()]
  },
});