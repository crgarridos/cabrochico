import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://crgarridos.github.io/cabrochico',
  base: 'cabrochico',
  integrations: [tailwind()]
});