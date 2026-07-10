/**
 * React-Island: Preiskarten der drei Tiers.
 *
 * Es gibt ausschließlich Jahrespreise (Jahresabo über Paddle), gestaffelt
 * nach Mitarbeiterzahl. Business ist der Staffelpreis, Enterprise ein Upgrade
 * darauf (+40 %). Da der Checkout die Mitarbeiterzahl braucht (Staffel-Band),
 * führen die Kauf-CTAs in den Preisrechner. Preise kommen zentral aus
 * src/lib/pricing.ts; die angezeigten Texte aus src/i18n/ui.ts (tierText).
 */
import {
  tiers,
  cheapestYearlyPerEmployee,
  formatEuro,
  GITHUB_REPO_URL,
  type Tier,
} from "../../lib/pricing";
import { ui, tierText, type Lang } from "../../i18n/ui";
import { intlLocale } from "../../i18n/utils";

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
        <span className="text-4xl font-extrabold tracking-tight text-gray-900">
          {t.priceFree}
        </span>
        <p className="mt-1 text-sm text-steel">{t.priceFreeSub}</p>
      </div>
    );
  }

  // Business & Enterprise: Einstiegspreis "ab" aus der günstigsten Staffel.
  // Enterprise = Business + 40 %.
  const isEnterprise = tier.id === "enterprise";
  return (
    <div className="mt-6">
      <span className="text-sm font-medium text-steel">{t.priceFrom}</span>{" "}
      <span className="text-4xl font-extrabold text-gray-900">
        {formatEuro(cheapestYearlyPerEmployee(isEnterprise), intlLocale(lang))}
      </span>
      <span className="text-sm font-medium text-steel"> {t.pricePerEmployeeYear}</span>
      <p className="mt-1 text-sm text-steel">
        {isEnterprise ? t.priceEnterpriseSub : t.priceBusinessSub}
      </p>
    </div>
  );
}

export default function PricingTiers({ lang }: { lang: Lang }) {
  const t = ui[lang];

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

              <h3 className="text-lg font-semibold text-gray-900">{text.name}</h3>
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
                {tier.id === "community" ? (
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full border border-gray-300 py-3 text-center text-sm font-semibold text-gray-800 transition-colors hover:border-brand-500 hover:bg-gray-50"
                  >
                    {t.ctaGithub}
                  </a>
                ) : (
                  <a
                    href="#preisrechner"
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                      tier.highlighted
                        ? "bg-brand-500 text-white shadow-md shadow-brand-500/25 hover:bg-brand-600"
                        : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    {t.ctaCalculatePrice}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
