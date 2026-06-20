import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Enable strict TypeScript checks
  vite: {
    ssr: {
      external: ['@astrojs/prism']
    }
  },
  // Set the output format
  output: 'static',
});
