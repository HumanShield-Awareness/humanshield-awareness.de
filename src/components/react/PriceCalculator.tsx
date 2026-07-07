/**
 * React-Island: Interaktiver Preisrechner.
 *
 * Rein clientseitige Berechnung (CLAUDE.md) – keine Backend-Anbindung.
 * Es gibt ausschließlich Jahrespreise, gestaffelt nach Mitarbeiterzahl.
 * Preislogik/Staffelung kommt zentral aus src/lib/pricing.ts (PLATZHALTER).
 */
import { useMemo, useState } from "react";
import {
  bandFor,
  billableEmployees,
  formatEuro,
  MAX_SELF_SERVICE_EMPLOYEES,
  MIN_ORDER_EMPLOYEES,
  SALES_EMAIL,
  tiers,
  totalYearly,
} from "../../lib/pricing";
import { openCheckout } from "../../lib/paddle";

const MIN = 1;
const MAX = 3000; // Slider bewusst über die Selbstbedienungs-Grenze hinaus

export default function PriceCalculator() {
  const [employees, setEmployees] = useState(100);
  const [pending, setPending] = useState(false);
  const [checkoutHint, setCheckoutHint] = useState<string | null>(null);

  const isEnterprise = employees > MAX_SELF_SERVICE_EMPLOYEES;
  const belowMinOrder = employees < MIN_ORDER_EMPLOYEES;
  const band = useMemo(() => bandFor(employees), [employees]);
  const yearly = useMemo(() => totalYearly(employees), [employees]);

  const businessTier = tiers.find((t) => t.id === "business");

  function clamp(value: number): number {
    if (Number.isNaN(value)) return MIN;
    return Math.min(MAX, Math.max(MIN, Math.round(value)));
  }

  async function handleCheckout() {
    if (!businessTier?.paddlePriceId) return;
    setPending(true);
    setCheckoutHint(null);
    // Menge = abgerechnete Mitarbeiterzahl (mind. Mindestbestellmenge);
    // das Paddle-Produkt muss als Stückpreis pro Mitarbeiter:in angelegt
    // sein (Staffel ggf. über Paddle-Preise lösen).
    const opened = await openCheckout(
      businessTier.paddlePriceId,
      billableEmployees(employees),
    );
    if (!opened) {
      setCheckoutHint(
        "Der Checkout ist gerade nicht verfügbar. Bitte schreiben Sie uns: " +
          SALES_EMAIL,
      );
    }
    setPending(false);
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <label htmlFor="employees" className="text-sm font-semibold text-gray-900">
          Wie viele Mitarbeitende hat Ihr Unternehmen?
        </label>
        <input
          id="employees"
          type="number"
          min={MIN}
          max={MAX}
          value={employees}
          onChange={(e) => setEmployees(clamp(e.target.valueAsNumber))}
          className="w-28 rounded-xl border border-gray-300 px-3 py-2 text-right text-sm font-semibold text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        value={employees}
        onChange={(e) => setEmployees(clamp(e.target.valueAsNumber))}
        aria-label="Mitarbeiterzahl wählen"
        className="mt-6 w-full accent-brand-500"
      />
      <div className="mt-1 flex justify-between text-xs text-steel">
        <span>{MIN}</span>
        <span>{MAX.toLocaleString("de-DE")}+</span>
      </div>

      <div className="mt-8 rounded-2xl bg-gray-50 p-6">
        {isEnterprise ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              Ab {(MAX_SELF_SERVICE_EMPLOYEES + 1).toLocaleString("de-DE")}{" "}
              Mitarbeitenden erstellen wir Ihnen gern ein individuelles
              Enterprise-Angebot.
            </p>
            <a
              href={`mailto:${SALES_EMAIL}?subject=HumanShield%20Enterprise%20(${employees}%20Mitarbeitende)`}
              className="mt-6 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              Enterprise-Angebot anfragen
            </a>
          </div>
        ) : (
          <>
            <div className="grid gap-6 text-center sm:grid-cols-2">
              <div>
                <p className="text-sm text-steel">Preis pro Mitarbeiter:in</p>
                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  {formatEuro(band.pricePerEmployeeYearly ?? 0)}
                  <span className="text-sm font-medium text-steel"> /Jahr</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-steel">Jahresabo gesamt</p>
                <p className="mt-1 text-2xl font-extrabold text-brand-500">
                  {yearly !== null ? formatEuro(yearly) : "–"}
                  <span className="text-sm font-medium text-steel"> /Jahr</span>
                </p>
              </div>
            </div>

            {belowMinOrder && (
              <p className="mt-4 text-center text-sm font-medium text-brand-700">
                Mindestbestellmenge: {MIN_ORDER_EMPLOYEES} Nutzer:innen – der
                Preis wird für {MIN_ORDER_EMPLOYEES} berechnet.
              </p>
            )}

            <p className="mt-4 text-center text-xs text-steel">
              Business-Tier · Abrechnung jährlich über Paddle · Mindestbestellmenge{" "}
              {MIN_ORDER_EMPLOYEES} Nutzer:innen · Preise zzgl. USt., Paddle weist
              die korrekte Steuer im Checkout aus
            </p>

            <div className="mt-6 text-center">
              <button
                type="button"
                disabled={pending}
                onClick={handleCheckout}
                className="rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all hover:bg-brand-600 disabled:opacity-60"
              >
                {pending
                  ? "Checkout wird geöffnet …"
                  : `Jahresabo für ${employees.toLocaleString("de-DE")} Mitarbeitende starten`}
              </button>
              {checkoutHint && (
                <p className="mt-4 text-sm font-medium text-brand-700">
                  {checkoutHint}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
