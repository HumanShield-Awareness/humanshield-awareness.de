/**
 * Zentrale Preis-Konfiguration – die EINZIGE Stelle, an der Preise,
 * Staffelung und Paddle-Preis-IDs gepflegt werden.
 *
 * ⚠️ ALLE PREISE UND STAFFELN SIND PLATZHALTER (siehe „Offene Punkte“ in der
 *    Installationsdoku). Vor Live-Schaltung hier finale Werte eintragen und
 *    die Paddle-Preis-IDs aus dem Paddle-Dashboard ersetzen.
 *
 * Modell: Es gibt ausschließlich Jahrespreise (Jahresabo über Paddle),
 * gestaffelt nach Mitarbeiterzahl. Keine monatliche Abrechnung.
 */

export const GITHUB_ORG_URL = "https://github.com/securebitsorg";
/** TODO: Auf das GitHub-Hauptrepository der HumanShield-Software zeigen lassen */
export const GITHUB_REPO_URL = "https://github.com/securebitsorg";

/** Kontakt für Enterprise-Anfragen */
export const SALES_EMAIL = "support@secure-bits.org";

/** Preis-Staffelung nach Mitarbeiterzahl – PLATZHALTER */
export interface PriceBand {
  /** Obergrenze Mitarbeiter (inklusive); null = „auf Anfrage“ */
  maxEmployees: number | null;
  /** €/Mitarbeiter/Jahr; null = „auf Anfrage“ (Enterprise) */
  pricePerEmployeeYearly: number | null;
}

export const priceBands: PriceBand[] = [
  { maxEmployees: 50, pricePerEmployeeYearly: 42 },
  { maxEmployees: 250, pricePerEmployeeYearly: 34.8 },
  { maxEmployees: 1000, pricePerEmployeeYearly: 26.4 },
  { maxEmployees: null, pricePerEmployeeYearly: null }, // > 1000 → Enterprise-Kontakt
];

export const MAX_SELF_SERVICE_EMPLOYEES = 1000;

export function bandFor(employees: number): PriceBand {
  return (
    priceBands.find(
      (b) => b.maxEmployees !== null && employees <= b.maxEmployees,
    ) ?? priceBands[priceBands.length - 1]
  );
}

/** Jahresgesamtpreis (Abrechnungsbetrag des Jahresabos), null wenn „auf Anfrage“ */
export function totalYearly(employees: number): number | null {
  const band = bandFor(employees);
  if (band.pricePerEmployeeYearly === null) return null;
  // Auf Cent runden, um Fließkomma-Artefakte zu vermeiden (z. B. 100 × 34,8)
  return Math.round(employees * band.pricePerEmployeeYearly * 100) / 100;
}

/** Günstigster Staffelpreis – für die „ab …“-Anzeige auf der Preiskarte */
export function cheapestYearlyPerEmployee(): number {
  return priceBands
    .map((b) => b.pricePerEmployeeYearly)
    .filter((p): p is number => p !== null)
    .sort((a, b) => a - b)[0];
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export interface Tier {
  id: "community" | "business" | "enterprise";
  name: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
  /**
   * Paddle-Preis-ID des Jahresabos – PLATZHALTER, im Paddle-Dashboard
   * angelegte ID (pri_…) eintragen. Nur für kaufbare Tiers gesetzt.
   */
  paddlePriceId?: string;
}

export const tiers: Tier[] = [
  {
    id: "community",
    name: "Community",
    tagline: "Open Core – selbst hosten, frei nutzen",
    features: [
      "Kernfunktionen als Open Source",
      "Self-Hosting auf eigener Infrastruktur",
      "Community-Support über GitHub",
      "Ideal zum Ausprobieren und für kleine Teams",
    ],
    highlighted: false,
  },
  {
    id: "business",
    name: "Business",
    tagline: "Für Unternehmen bis 1.000 Mitarbeitende",
    features: [
      "Alle Community-Funktionen",
      "Erweiterte Phishing-Simulationen & Kampagnen",
      "Reporting und Auswertungen",
      "Lizenz per E-Mail, offline validierbar",
      "E-Mail-Support",
    ],
    highlighted: true,
    paddlePriceId: "pri_PLATZHALTER_BUSINESS_JAHRESABO",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Für große Organisationen ab 1.000 Mitarbeitenden",
    features: [
      "Alle Business-Funktionen",
      "Individuelle Staffelpreise",
      "Onboarding-Unterstützung",
      "Prioritäts-Support",
      "Individuelle Vertragsgestaltung",
    ],
    highlighted: false,
  },
];
