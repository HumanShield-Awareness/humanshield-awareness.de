// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://humanshield-awareness.de",
  // Rein statische Ausgabe für Cloudflare Pages – kein SSR/Node-Prozess
  output: "static",
  // Zweisprachig (DE/EN). prefixDefaultLocale: true → auch Deutsch unter /de/,
  // die Root-Route / wird von src/pages/index.astro (Redirect) bedient.
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    // redirectToDefaultLocale: false → Astro erzeugt KEINE automatische
    // Root-Weiterleitung; die Sprachweiche macht src/pages/index.astro selbst
    // (Browsersprache erkennen, sonst DE).
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
