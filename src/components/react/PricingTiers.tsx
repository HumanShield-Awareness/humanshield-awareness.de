/**
 * React-Island: Preiskarten der drei Tiers.
 *
 * Es gibt ausschließlich Jahrespreise (Jahresabo über Paddle), gestaffelt
 * nach Mitarbeiterzahl. Preise & Paddle-IDs kommen zentral aus
 * src/lib/pricing.ts; die angezeigten Texte aus src/i18n/ui.ts (tierText).
 */
import { useState } from "react";
import {
  tiers,
  cheapestYearlyPerEmployee,
  formatEuro,
  GITHUB_REPO_URL,
  SALES_EMAIL,
  type Tier,
} from "../../lib/pricing";
import { ui, tierText, type Lang } from "../../i18n/ui";
import { intlLocale } from "../../i18n/utils";
import { openCheckout } from "../../lib/paddle";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 shrink-0 text-brand-500"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

function TierPrice({ tier, lang }: { tier: Tier; lang: Lang }) {
  const t = ui[lang];

  if (tier.id === "community") {
    return (
      <div className="mt-6">
        <span className="text-4xl font-extrabold text-gray-900">
          {t.priceFree}
        </span>
        <p className="mt-1 text-sm text-steel">{t.priceFreeSub}</p>
      </div>
    );
  }

  if (tier.id === "enterprise") {
    return (
      <div className="mt-6">
        <span className="text-4xl font-extrabold text-gray-900">
          {t.priceOnRequest}
        </span>
        <p className="mt-1 text-sm text-steel">{t.priceOnRequestSub}</p>
      </div>
    );
  }

  // Business: Einstiegspreis "ab" aus der günstigsten Staffel
  return (
    <div className="mt-6">
      <span className="text-sm font-medium text-steel">{t.priceFrom}</span>{" "}
      <span className="text-4xl font-extrabold text-gray-900">
        {formatEuro(cheapestYearlyPerEmployee(), intlLocale(lang))}
      </span>
      <span className="text-sm font-medium text-steel">
        {" "}
        {t.pricePerEmployeeYear}
      </span>
      <p className="mt-1 text-sm text-steel">{t.priceBusinessSub}</p>
    </div>
  );
}

export default function PricingTiers({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [pending, setPending] = useState(false);
  const [checkoutHint, setCheckoutHint] = useState<string | null>(null);

  async function handleCheckout(tier: Tier) {
    if (!tier.paddlePriceId) return;
    setPending(true);
    setCheckoutHint(null);
    const opened = await openCheckout(tier.paddlePriceId);
    if (!opened) {
      setCheckoutHint(t.checkoutUnavailable + SALES_EMAIL);
    }
    setPending(false);
  }

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const text = tierText[lang][tier.id];
          return (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                tier.highlighted
                  ? "border-brand-500 shadow-lg shadow-brand-500/10"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-semibold tracking-wide text-white">
                  {t.popular}
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900">
                {text.name}
              </h3>
              <p className="mt-1 text-sm text-steel">{text.tagline}</p>

              <TierPrice tier={tier} lang={lang} />

              <ul className="mt-8 flex-1 space-y-3">
                {text.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {tier.id === "community" && (
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50"
                  >
                    {t.ctaGithub}
                  </a>
                )}
                {tier.id === "business" && (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleCheckout(tier)}
                    className="block w-full rounded-full bg-brand-500 py-3 text-center text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all hover:bg-brand-600 disabled:opacity-60"
                  >
                    {pending ? t.checkoutOpening : t.ctaStartSubscription}
                  </button>
                )}
                {tier.id === "enterprise" && (
                  <a
                    href={`mailto:${SALES_EMAIL}?subject=HumanShield%20Enterprise`}
                    className="block w-full rounded-full border border-gray-900 py-3 text-center text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
                  >
                    {t.ctaContact}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {checkoutHint && (
        <p className="mt-6 text-center text-sm font-medium text-brand-700">
          {checkoutHint}
        </p>
      )}
    </div>
  );
}
