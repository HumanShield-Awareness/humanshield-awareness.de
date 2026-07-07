/**
 * Content Collections – alle Marketing-Texte werden als Markdown in
 * src/content/ gepflegt. Preise/Staffelung bleiben bewusst in
 * src/lib/pricing.ts (Rechenlogik für den Preisrechner).
 *
 * Struktur:
 *   texte/     – Hero, Sektions-Überschriften, CTA-Banner (Frontmatter + Body)
 *   features/  – eine Datei pro Feature-Karte der Startseite
 *   vertrauen/ – Karten der Compliance-Sektion (Made in Germany, DSGVO, NIS2)
 *   steps/     – eine Datei pro „So funktioniert's“-Schritt
 *   addons/    – Funktionsumfang je Add-on (Business, Enterprise), gruppiert
 *   faq/       – eine Datei pro FAQ-Eintrag der Preisseite
 *   seiten/    – ganze Fließtext-Seiten (Impressum, Datenschutz)
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const texte = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/texte" }),
  schema: z.object({
    badge: z.string().optional(),
    title: z.string().optional(),
    /** Teil des Titels, der orange hervorgehoben wird (nur Hero) */
    titleHighlight: z.string().optional(),
    note: z.string().optional(),
    ctaPrimary: z.string().optional(),
    ctaSecondary: z.string().optional(),
  }),
});

const features = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/features" }),
  schema: z.object({
    title: z.string(),
    /** Icon-Name, siehe Icon-Map in src/pages/index.astro */
    icon: z.enum([
      "mail",
      "academic-cap",
      "chart-bar",
      "shield-check",
      "code-bracket",
      "lock-closed",
    ]),
    order: z.number(),
  }),
});

const vertrauen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/vertrauen" }),
  schema: z.object({
    title: z.string(),
    /** Icon-Name, siehe Icon-Map in src/pages/index.astro */
    icon: z.enum(["map-pin", "shield-check", "document-check"]),
    order: z.number(),
  }),
});

const steps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/steps" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});

const addons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/addons" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    order: z.number(),
    /** Optische Hervorhebung auf der Funktionsseite */
    highlighted: z.boolean().default(false),
    /** Funktionsgruppen mit ihren Einzel-Features */
    groups: z.array(
      z.object({
        title: z.string(),
        features: z.array(z.string()),
      }),
    ),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
  }),
});

const seiten = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/seiten" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  texte,
  features,
  vertrauen,
  steps,
  addons,
  faq,
  seiten,
};
