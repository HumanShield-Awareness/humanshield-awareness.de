// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMermaid from "./src/lib/remark-mermaid.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://sentrymail.de",
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
  // ```mermaid-Codeblöcke zu clientseitig gerenderten Diagrammen machen
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    react(),
    // Erzeugt sitemap-index.xml + sitemap-0.xml für die Google-Indexierung,
    // inkl. hreflang-Alternates für die DE/EN-Sprachvarianten.
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: { de: "de", en: "en" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
