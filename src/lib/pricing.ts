/**
 * Zentrale Preis-Konfiguration – die EINZIGE Stelle, an der Preise,
 * Staffelung und Paddle-Preis-IDs gepflegt werden.
 *
 * Preisstaffel: final (Stand Juli 2026).
 * ⚠️ Die Paddle-Preis-IDs sind noch PLATZHALTER – vor Live-Schaltung die
 *    IDs (pri_…) aus dem Paddle-Dashboard eintragen.
 *
 * Modell: Es gibt ausschließlich Jahrespreise (Jahresabo über Paddle),
 * gestaffelt nach Mitarbeiterzahl. Keine monatliche Abrechnung.
 * Mindestbestellmenge: 25 Nutzer:innen.
 */

export const GITHUB_ORG_URL = "https://github.com/securebitsorg";
/** GitHub-Hauptrepository der HumanShield-Software */
export const GITHUB_REPO_URL = "https://github.com/securebitsorg/HumanShield.APP";

/** Kontakt für Enterprise-Anfragen */
export const SALES_EMAIL = "support@secure-bits.org";

/** Preis-Staffelung nach Mitarbeiterzahl */
export interface PriceBand {
  /** Obergrenze Mitarbeiter (inklusive); null = „auf Anfrage“ */
  maxEmployees: number | null;
  /** €/Mitarbeiter/Jahr; null = „auf Anfrage“ (Enterprise) */
  pricePerEmployeeYearly: number | null;
}

export const priceBands: PriceBand[] = [
  { maxEmployees: 50, pricePerEmployeeYearly: 25 },
  { maxEmployees: 150, pricePerEmployeeYearly: 21 },
  { maxEmployees: 300, pricePerEmployeeYearly: 18 },
  { maxEmployees: 500, pricePerEmployeeYearly: 15 },
  { maxEmployees: 1000, pricePerEmployeeYearly: 13 },
  { maxEmployees: 2500, pricePerEmployeeYearly: 11 },
  { maxEmployees: null, pricePerEmployeeYearly: null }, // > 2.500 → Enterprise-Kontakt
];

/** Mindestbestellmenge – kleinere Teams zahlen für 25 Nutzer:innen */
export const MIN_ORDER_EMPLOYEES = 25;

export const MAX_SELF_SERVICE_EMPLOYEES = 2500;

/** Abgerechnete Menge: nie weniger als die Mindestbestellmenge */
export function billableEmployees(employees: number): number {
  return Math.max(employees, MIN_ORDER_EMPLOYEES);
}

export function bandFor(employees: number): PriceBand {
  const billable = billableEmployees(employees);
  return (
    priceBands.find(
      (b) => b.maxEmployees !== null && billable <= b.maxEmployees,
    ) ?? priceBands[priceBands.length - 1]
  );
}

/** Jahresgesamtpreis (Abrechnungsbetrag des Jahresabos), null wenn „auf Anfrage“ */
export function totalYearly(employees: number): number | null {
  const band = bandFor(employees);
  if (band.pricePerEmployeeYearly === null) return null;
  // Auf Cent runden, um Fließkomma-Artefakte zu vermeiden
  return (
    Math.round(billableEmployees(employees) * band.pricePerEmployeeYearly * 100) /
    100
  );
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
    tagline: "Für Unternehmen bis 2.500 Mitarbeitende",
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
    tagline: "Für große Organisationen ab 2.500 Mitarbeitenden",
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
