/**
 * i18n-Hilfsfunktionen für Astro-Seiten/Komponenten und React-Islands.
 * Wörterbuch: siehe src/i18n/ui.ts.
 */
import { ui, defaultLang, languages, type Lang, type UIKey } from "./ui";

/** Locale aus einer URL ableiten (erstes Pfadsegment), Fallback: defaultLang. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split("/")[1];
  return seg in languages ? (seg as Lang) : defaultLang;
}

/** Übersetzungsfunktion für eine Sprache – t("navPricing"). */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Ersetzt {platzhalter} in einem String: format("Ab {n} …", { n: 5 }). */
export function format(
  str: string,
  params: Record<string, string | number>,
): string {
  return str.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{${key}}`,
  );
}

/**
 * Baut einen sprachpräfixierten internen Pfad.
 *   localizedPath("de", "/preise")            → "/de/preise"
 *   localizedPath("en", "/")                  → "/en/"
 *   localizedPath("de", "/preise#preisrechner") → "/de/preise#preisrechner"
 */
export function localizedPath(lang: Lang, path: string): string {
  if (path === "/") return `/${lang}/`;
  return `/${lang}${path}`;
}

/** Gleiche Seite in anderer Sprache – für den Sprachumschalter. */
export function switchLangPath(url: URL, lang: Lang): string {
  return url.pathname.replace(/^\/(de|en)/, `/${lang}`) || `/${lang}/`;
}

/** Intl-Locale-String für Zahlen-/Währungsformatierung. */
export function intlLocale(lang: Lang): string {
  return lang === "de" ? "de-DE" : "en-GB";
}
