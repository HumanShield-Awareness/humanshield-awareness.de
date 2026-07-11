/**
 * React-Island: „Bald verfügbar“-Overlay.
 *
 * Legt sich über die Preiskarten und den Preisrechner, solange der Verkauf
 * noch nicht freigeschaltet ist (CHECKOUT_ENABLED === false in pricing.ts).
 * Verhindert damit sichtbar UND funktional jeden Kaufprozess: der darunter
 * liegende Inhalt wird per `inert`/pointer-events-none deaktiviert, das
 * Overlay fängt alle Klicks ab. Verweist stattdessen auf die kostenlose
 * Core-Version auf GitHub.
 */
import { GITHUB_REPO_URL } from "../../lib/pricing";
import { ui, type Lang } from "../../i18n/ui";

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .199.079.39.22.53l3 3a.75.75 0 1 0 1.06-1.06l-2.78-2.78V5Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ComingSoonOverlay({ lang }: { lang: Lang }) {
  const t = ui[lang];

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
      {/* Weicher, milchiger Schleier über dem darunterliegenden Inhalt */}
      <div
        className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      {/* Hinweiskarte */}
      <div
        role="status"
        className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white/95 p-8 text-center shadow-xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
          <ClockIcon />
          {t.comingSoonBadge}
        </span>

        <h3 className="mt-4 text-2xl font-bold tracking-display text-gray-900">
          {t.comingSoonTitle}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-steel">
          {t.comingSoonText}
        </p>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all hover:bg-brand-600"
        >
          {t.comingSoonGithubCta}
        </a>
      </div>
    </div>
  );
}
