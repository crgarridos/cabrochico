import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://crgarridos.github.io/cabrochico',
  base: 'cabrochico',
  integrations: [tailwind()],
  trailingSlash: "ignore", // explicitly here. we need it for base + active higlighting in Header
});