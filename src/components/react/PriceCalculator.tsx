/**
 * React-Island: Interaktiver Preisrechner.
 *
 * Rein clientseitige Berechnung (CLAUDE.md) – keine Backend-Anbindung.
 * Es gibt ausschließlich Jahrespreise, gestaffelt nach Mitarbeiterzahl.
 * Business ist der Staffelpreis; Enterprise ein Upgrade darauf (+40 %),
 * das per Checkbox dazugebucht wird. Preislogik/Staffelung kommt zentral aus
 * src/lib/pricing.ts (PLATZHALTER), feste Texte aus src/i18n/ui.ts.
 */
import { useMemo, useState } from "react";
import {
  billableEmployees,
  checkoutItems,
  formatEuro,
  MIN_ORDER_EMPLOYEES,
  perEmployeeYearly,
  SALES_EMAIL,
  totalYearly,
  CHECKOUT_ENABLED,
} from "../../lib/pricing";
import { ui, type Lang } from "../../i18n/ui";
import { format, intlLocale } from "../../i18n/utils";
import { openCheckout } from "../../lib/paddle";
import ComingSoonOverlay from "./ComingSoonOverlay";

const MIN = 1;
const MAX = 3000; // Slider-Obergrenze; größere Zahlen können getippt werden

export default function PriceCalculator({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const locale = intlLocale(lang);
  // Startwert = Mindestbestellmenge (kleinste kaufbare Lizenzanzahl)
  const [employees, setEmployees] = useState(MIN_ORDER_EMPLOYEES);
  const [enterprise, setEnterprise] = useState(false);
  const [pending, setPending] = useState(false);
  const [checkoutHint, setCheckoutHint] = useState<string | null>(null);

  const belowMinOrder = employees < MIN_ORDER_EMPLOYEES;
  const perEmployee = useMemo(
    () => perEmployeeYearly(employees, enterprise),
    [employees, enterprise],
  );
  const yearly = useMemo(
    () => totalYearly(employees, enterprise),
    [employees, enterprise],
  );

  function clamp(value: number): number {
    if (Number.isNaN(value)) return MIN;
    return Math.min(MAX, Math.max(MIN, Math.round(value)));
  }

  async function handleCheckout() {
    setPending(true);
    setCheckoutHint(null);
    const opened = await openCheckout(checkoutItems(employees, enterprise));
    if (!opened) {
      setCheckoutHint(t.checkoutUnavailable + SALES_EMAIL);
    }
    setPending(false);
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Solange der Verkauf nicht freigeschaltet ist: Rechner deaktivieren und
          „Bald verfügbar“-Overlay darüberlegen – kein Kaufprozess möglich. */}
      <div
        className={`rounded-3xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10 ${
          CHECKOUT_ENABLED ? "" : "pointer-events-none select-none"
        }`}
        inert={CHECKOUT_ENABLED ? undefined : true}
      >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <label htmlFor="employees" className="text-sm font-semibold text-gray-900">
          {t.calcLabel}
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
        aria-label={t.calcSliderAria}
        className="mt-6 w-full accent-brand-500"
      />
      <div className="mt-1 flex justify-between text-xs text-steel">
        <span>{MIN}</span>
        <span>{MAX.toLocaleString(locale)}+</span>
      </div>

      {/* Enterprise-Upgrade (+40 %) als optionale Zubuchung zum Business-Add-on */}
      <label
        htmlFor="enterprise"
        className={`mt-8 flex cursor-pointer items-start gap-3 rounded-2xl border p-5 transition-colors ${
          enterprise
            ? "border-brand-500 bg-brand-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <input
          id="enterprise"
          type="checkbox"
          checked={enterprise}
          onChange={(e) => setEnterprise(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-brand-500"
        />
        <span>
          <span className="block text-sm font-semibold text-gray-900">
            {t.calcEnterpriseToggle}
          </span>
          <span className="mt-1 block text-xs text-steel">
            {t.calcEnterpriseHint}
          </span>
        </span>
      </label>

      <div className="mt-6 rounded-2xl bg-gray-50 p-6">
        <div className="grid gap-6 text-center sm:grid-cols-2">
          <div>
            <p className="text-sm text-steel">{t.calcPricePerEmployee}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              {formatEuro(perEmployee, locale)}
              <span className="text-sm font-medium text-steel"> {t.calcPerYear}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-steel">{t.calcYearlyTotal}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-brand-500">
              {formatEuro(yearly, locale)}
              <span className="text-sm font-medium text-steel"> {t.calcPerYear}</span>
            </p>
          </div>
        </div>

        {enterprise && (
          <p className="mt-4 text-center text-sm font-medium text-brand-700">
            {t.calcEnterpriseIncluded}
          </p>
        )}

        {belowMinOrder && (
          <p className="mt-4 text-center text-sm font-medium text-brand-700">
            {format(t.calcBelowMin, { min: MIN_ORDER_EMPLOYEES })}
          </p>
        )}

        <p className="mt-4 text-center text-xs text-steel">
          {format(t.calcDisclaimer, { min: MIN_ORDER_EMPLOYEES })}
        </p>

        <div className="mt-6 text-center">
          <button
            type="button"
            disabled={pending}
            onClick={handleCheckout}
            className="rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all hover:bg-brand-600 disabled:opacity-60"
          >
            {pending
              ? t.checkoutOpening
              : format(enterprise ? t.calcCheckoutBtnEnterprise : t.calcCheckoutBtn, {
                  n: billableEmployees(employees).toLocaleString(locale),
                })}
          </button>
          {checkoutHint && (
            <p className="mt-4 text-sm font-medium text-brand-700">{checkoutHint}</p>
          )}
        </div>
      </div>
      </div>

      {!CHECKOUT_ENABLED && <ComingSoonOverlay lang={lang} />}
    </div>
  );
}
