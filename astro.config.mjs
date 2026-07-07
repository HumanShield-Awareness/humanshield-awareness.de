// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://humanshield-awareness.de",
  // Rein statische Ausgabe für Cloudflare Pages – kein SSR/Node-Prozess
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
