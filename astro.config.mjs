import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://crgarridos.github.io/cabrochico",
  base: "cabrochico",
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind()],
  trailingSlash: "ignore",
  // ^ explicitly here. we need it for base + active higlighting in Header
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en", "fr"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
});