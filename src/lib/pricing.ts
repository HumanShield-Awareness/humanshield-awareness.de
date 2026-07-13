/**
 * Zentrale Preis-Konfiguration – die EINZIGE Stelle, an der Preise,
 * Staffelung und Paddle-Preis-IDs gepflegt werden.
 *
 * Preisstaffel: final (Stand Juli 2026).
 * Achtung: Die Paddle-Preis-IDs sind noch PLATZHALTER – vor Live-Schaltung die
 *    IDs (pri_…) aus dem Paddle-Dashboard eintragen.
 *
 * Modell: Es gibt ausschließlich Jahrespreise (Jahresabo über Paddle),
 * gestaffelt nach Mitarbeiterzahl. Keine monatliche Abrechnung.
 * Mindestbestellmenge: 25 Nutzer:innen.
 *
 * Zwei Add-ons auf die kostenlose Core-Version:
 *   • Business – der Staffelpreis pro Mitarbeiter:in/Jahr (siehe priceBands).
 *   • Enterprise – KEIN eigenständiges Add-on, sondern ein Upgrade auf
 *     Business: fester Aufschlag von +40 % auf den Business-Preis. In Paddle
 *     als zusätzliches „Delta“-Item (nur die 40 % Differenz) abgebildet, das
 *     gemeinsam mit dem Business-Item gebucht wird. Der Kunde zahlt also
 *     Business (100 %) + Enterprise-Delta (40 %) = 140 %.
 */

export const GITHUB_ORG_URL = "https://github.com/HumanShield-Awareness";
/** GitHub-Hauptrepository der HumanShield-Software */
export const GITHUB_REPO_URL = "https://github.com/HumanShield-Awareness/HumanShield.APP";

/**
 * Verkaufs-Schalter. Solange `false`, ist KEIN Kaufprozess möglich:
 * Preiskarten und Preisrechner zeigen ein „Bald verfügbar“-Overlay und der
 * Paddle-Checkout wird gar nicht erst geöffnet (siehe openCheckout in
 * src/lib/paddle.ts). Hintergrund: Lizenzen dürfen erst nach der
 * Gewerbeanmeldung verkauft werden – bis dahin ist nur die kostenlose
 * Core-Version auf GitHub verfügbar. Auf `true` setzen, sobald der Verkauf
 * (Gewerbe + Paddle-Preis-IDs) startklar ist.
 */
export const CHECKOUT_ENABLED = false;

/** Kontakt für Vertriebs-/Enterprise-Anfragen */
export const SALES_EMAIL = "support@humanshield.app";

/**
 * Statischer Link zum Paddle-Kundenportal (Merchant of Record). Über diese
 * kontospezifische URL verwalten Kunden Rechnungen & Abos selbst: E-Mail
 * eingeben → Paddle sendet einen Magic-Link → eingeloggt. Kein eigenes Backend
 * nötig (siehe /rechnungen-Seite). Form: https://customer-portal.paddle.com/cpl_…
 * Solange leer, verweist die Seite nur auf den „Verwalten“-Link in den
 * Paddle-Rechnungs-E-Mails. Die konkrete cpl_-URL steht in jeder Paddle-Beleg-
 * E-Mail bzw. im Paddle-Dashboard.
 */
export const PADDLE_CUSTOMER_PORTAL_URL =
  "https://customer-portal.paddle.com/cpl_01kwz052rj8tc6gztzrxce9p5f";

/** Enterprise ist ein Upgrade auf Business: fester Aufschlag von +40 %. */
export const ENTERPRISE_SURCHARGE = 0.4;

/** Preis-Staffelung nach Mitarbeiterzahl */
export interface PriceBand {
  /** Obergrenze Mitarbeiter (inklusive); null = oberstes Band (nach oben offen) */
  maxEmployees: number | null;
  /** Business-Preis in €/Mitarbeiter:in/Jahr */
  pricePerEmployeeYearly: number;
  /** Paddle-Preis-ID des Business-Add-ons für dieses Band (PLATZHALTER) */
  paddleBusinessPriceId: string;
  /**
   * Paddle-Preis-ID des Enterprise-Delta-Add-ons für dieses Band (PLATZHALTER).
   * Trägt NUR die 40 %-Differenz – wird zusammen mit dem Business-Item gebucht.
   */
  paddleEnterpriseDeltaPriceId: string;
}

export const priceBands: PriceBand[] = [
  {
    maxEmployees: 50,
    pricePerEmployeeYearly: 25,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band1",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band1",
  },
  {
    maxEmployees: 150,
    pricePerEmployeeYearly: 21,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band2",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band2",
  },
  {
    maxEmployees: 300,
    pricePerEmployeeYearly: 18,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band3",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band3",
  },
  {
    maxEmployees: 500,
    pricePerEmployeeYearly: 15,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band4",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band4",
  },
  {
    maxEmployees: 1000,
    pricePerEmployeeYearly: 13,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band5",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band5",
  },
  {
    maxEmployees: 2500,
    pricePerEmployeeYearly: 11,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band6",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band6",
  },
  {
    maxEmployees: null, // > 2.500 → oberstes Band, nach oben offen
    pricePerEmployeeYearly: 10,
    paddleBusinessPriceId: "pri_PLATZHALTER_biz_band7",
    paddleEnterpriseDeltaPriceId: "pri_PLATZHALTER_ent_band7",
  },
];

/** Mindestbestellmenge – kleinere Teams zahlen für 25 Nutzer:innen */
export const MIN_ORDER_EMPLOYEES = 25;

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

/**
 * Preis pro Mitarbeiter:in/Jahr für das gewählte Staffel-Band.
 * Mit `enterprise` wird der Enterprise-Aufschlag (+40 %) aufgeschlagen.
 */
export function perEmployeeYearly(employees: number, enterprise = false): number {
  const base = bandFor(employees).pricePerEmployeeYearly;
  const price = enterprise ? base * (1 + ENTERPRISE_SURCHARGE) : base;
  return Math.round(price * 100) / 100;
}

/**
 * Jahresgesamtpreis (Abrechnungsbetrag des Jahresabos).
 * Mit `enterprise` inklusive Enterprise-Aufschlag (+40 %).
 */
export function totalYearly(employees: number, enterprise = false): number {
  const base = billableEmployees(employees) * bandFor(employees).pricePerEmployeeYearly;
  const total = enterprise ? base * (1 + ENTERPRISE_SURCHARGE) : base;
  // Auf Cent runden, um Fließkomma-Artefakte zu vermeiden
  return Math.round(total * 100) / 100;
}

/**
 * Günstigster Staffelpreis (oberstes Band) – für die „ab …“-Anzeige auf der
 * Preiskarte. Mit `enterprise` der günstigste Enterprise-Preis (+40 %).
 */
export function cheapestYearlyPerEmployee(enterprise = false): number {
  const cheapestBase = Math.min(
    ...priceBands.map((b) => b.pricePerEmployeeYearly),
  );
  const price = enterprise ? cheapestBase * (1 + ENTERPRISE_SURCHARGE) : cheapestBase;
  return Math.round(price * 100) / 100;
}

/**
 * Paddle-Checkout-Items für die gewählte Mitarbeiterzahl.
 * Immer das Business-Item; bei `enterprise` zusätzlich das Enterprise-Delta-Item
 * mit identischer Menge (beide zusammen ergeben den 140 %-Gesamtpreis).
 */
export function checkoutItems(
  employees: number,
  enterprise = false,
): { priceId: string; quantity: number }[] {
  const band = bandFor(employees);
  const quantity = billableEmployees(employees);
  const items = [{ priceId: band.paddleBusinessPriceId, quantity }];
  if (enterprise) {
    items.push({ priceId: band.paddleEnterpriseDeltaPriceId, quantity });
  }
  return items;
}

/**
 * Währungsformat. `locale` steuert Tausendertrennung/Format (Default de-DE);
 * die Währung bleibt immer EUR. Sprachabhängige Locale kommt aus
 * src/i18n/utils.ts → intlLocale(lang).
 */
export function formatEuro(value: number, locale = "de-DE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export interface Tier {
  id: "community" | "business" | "enterprise";
  highlighted: boolean;
}

/**
 * Struktur & Anzeige-Metadaten der Tiers. Die angezeigten Texte (Name, Tagline,
 * Feature-Liste) sind lokalisiert und liegen in src/i18n/ui.ts → tierText.
 * Preise/Paddle-IDs stehen zentral in priceBands – Business und Enterprise
 * teilen sich dieselbe Staffel (Enterprise = Business + 40 %).
 */
export const tiers: Tier[] = [
  { id: "community", highlighted: false },
  { id: "business", highlighted: true },
  { id: "enterprise", highlighted: false },
];
