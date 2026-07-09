/**
 * Zentrale UI-Übersetzungen (feste Strings, die nicht als Content-Markdown
 * gepflegt werden). Reines TS-Modul – wird sowohl von .astro-Dateien als auch
 * von den React-Islands (src/components/react/*) importiert.
 *
 * Content-Texte (Marketing-Fließtext) liegen weiterhin als Markdown in
 * src/content/<collection>/<lang>/… – siehe src/content.config.ts.
 */

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "de";

export const ui = {
  de: {
    // ── Header / Navigation ──────────────────────────────────────────────
    navFeatures: "Funktionen",
    navHowItWorks: "So funktioniert's",
    navPricing: "Preise",
    navCalculator: "Preisrechner",
    getStarted: "Jetzt starten",
    github: "GitHub",
    ariaMainNav: "Hauptnavigation",
    ariaMobileNav: "Mobile Navigation",
    ariaOpenMenu: "Menü öffnen",
    ariaSwitchLanguage: "Sprache wechseln",

    // ── Footer ───────────────────────────────────────────────────────────
    footerTagline:
      "Security Awareness, die Ihre Mitarbeitenden zur stärksten Verteidigungslinie macht. Entwickelt in Deutschland – DSGVO-konform und NIS2-ready.",
    footerProduct: "Produkt",
    footerResources: "Ressourcen",
    footerLegal: "Rechtliches",
    footerGithubOpenCore: "GitHub (Open Core)",
    footerManageBilling: "Rechnungen & Abo verwalten",
    footerContact: "Kontakt",
    footerImprint: "Impressum",
    footerPrivacy: "Datenschutz",
    footerRights: "Alle Rechte vorbehalten.",
    footerPaddlePrefix: "Zahlungsabwicklung über",
    footerPaddleSuffix: "(Merchant of Record)",

    // ── Startseite ───────────────────────────────────────────────────────
    homeSeeAllFeatures: "Alle Funktionen der Add-ons ansehen",
    madeInGermanyBadge: "Made in Germany",

    // ── Mono-Eyebrows (Overlines, werden per CSS in GROSSBUCHSTABEN gesetzt) ─
    heroEyebrow: "Security Awareness, die wirkt",
    featuresEyebrow: "Die Plattform",
    howEyebrow: "So funktioniert's",
    complianceEyebrow: "Made in Germany",
    openCoreEyebrow: "Open Core",
    pricingEyebrow: "Preise",
    calculatorEyebrow: "Preisrechner",
    faqEyebrow: "FAQ",
    featuresPageEyebrow: "Funktionsumfang",

    // ── Funktionsseite ───────────────────────────────────────────────────
    funcTierCore: "Core – kostenlos",
    funcTierBusiness: "+ Business",
    funcTierEnterprise: "+ Enterprise",
    funcCtaTitle: "Bereit für den vollen Funktionsumfang?",
    funcCtaText:
      "Berechnen Sie Ihren Preis oder starten Sie kostenlos mit der Core-Version.",
    funcCtaPrimary: "Preis berechnen",
    funcCtaSecondary: "Core kostenlos starten",

    // ── Preisseite ───────────────────────────────────────────────────────
    faqStillQuestions: "Noch Fragen? Schreiben Sie uns an",

    // ── Meta / SEO ───────────────────────────────────────────────────────
    metaHomeTitle: "HumanShield Awareness – Security Awareness, die wirkt",
    metaDefaultDesc:
      "HumanShield Awareness – Security-Awareness-Trainings und Phishing-Simulationen, die Ihre Mitarbeitenden zur stärksten Verteidigungslinie machen. Entwickelt in Deutschland, DSGVO-konform und NIS2-ready.",
    metaPricingTitle: "Preise – HumanShield Awareness",
    metaPricingDesc:
      "Transparente Preise für HumanShield Awareness: kostenlose Community-Edition, Business-Jahresabo gestaffelt nach Mitarbeiterzahl und individuelle Enterprise-Angebote.",
    metaFeaturesTitle: "Funktionen – HumanShield Awareness",
    metaFeaturesDesc:
      "Alle Funktionen von HumanShield Awareness im Überblick: Was die kostenlose Core-Version, das Business-Add-on und das Enterprise-Add-on freischalten.",
    titleSuffix: "HumanShield Awareness",

    // ── Preiskarten (PricingTiers.tsx) ───────────────────────────────────
    popular: "Beliebt",
    priceFree: "Kostenlos",
    priceFreeSub: "für immer, self-hosted",
    priceOnRequest: "Auf Anfrage",
    priceOnRequestSub: "individuelle Staffelpreise",
    priceFrom: "ab",
    pricePerEmployeeYear: "/ Mitarbeiter:in / Jahr",
    priceBusinessSub: "Jahresabo, gestaffelt nach Mitarbeiterzahl",
    ctaGithub: "Auf GitHub starten",
    ctaStartSubscription: "Jahresabo starten",
    ctaContact: "Kontakt aufnehmen",
    checkoutOpening: "Checkout wird geöffnet …",
    checkoutUnavailable:
      "Der Checkout ist gerade nicht verfügbar. Bitte schreiben Sie uns: ",

    // ── Preisrechner (PriceCalculator.tsx) ───────────────────────────────
    calcLabel: "Wie viele Mitarbeitende hat Ihr Unternehmen?",
    calcSliderAria: "Mitarbeiterzahl wählen",
    calcEnterpriseLead:
      "Ab {n} Mitarbeitenden erstellen wir Ihnen gern ein individuelles Enterprise-Angebot.",
    calcEnterpriseCta: "Enterprise-Angebot anfragen",
    calcEnterpriseSubject: "HumanShield Enterprise ({n} Mitarbeitende)",
    calcPricePerEmployee: "Preis pro Mitarbeiter:in",
    calcPerYear: "/Jahr",
    calcYearlyTotal: "Jahresabo gesamt",
    calcBelowMin:
      "Mindestbestellmenge: {min} Nutzer:innen – der Preis wird für {min} berechnet.",
    calcDisclaimer:
      "Business-Tier · Abrechnung jährlich über Paddle · Mindestbestellmenge {min} Nutzer:innen · Preise zzgl. USt., Paddle weist die korrekte Steuer im Checkout aus",
    calcCheckoutBtn: "Jahresabo für {n} Mitarbeitende starten",
  },

  en: {
    // ── Header / Navigation ──────────────────────────────────────────────
    navFeatures: "Features",
    navHowItWorks: "How it works",
    navPricing: "Pricing",
    navCalculator: "Price calculator",
    getStarted: "Get started",
    github: "GitHub",
    ariaMainNav: "Main navigation",
    ariaMobileNav: "Mobile navigation",
    ariaOpenMenu: "Open menu",
    ariaSwitchLanguage: "Switch language",

    // ── Footer ───────────────────────────────────────────────────────────
    footerTagline:
      "Security awareness that turns your employees into your strongest line of defense. Built in Germany – GDPR-compliant and NIS2-ready.",
    footerProduct: "Product",
    footerResources: "Resources",
    footerLegal: "Legal",
    footerGithubOpenCore: "GitHub (Open Core)",
    footerManageBilling: "Manage invoices & subscription",
    footerContact: "Contact",
    footerImprint: "Legal notice",
    footerPrivacy: "Privacy",
    footerRights: "All rights reserved.",
    footerPaddlePrefix: "Payments processed by",
    footerPaddleSuffix: "(Merchant of Record)",

    // ── Home ─────────────────────────────────────────────────────────────
    homeSeeAllFeatures: "See all add-on features",
    madeInGermanyBadge: "Made in Germany",

    // ── Mono eyebrows (overlines, uppercased via CSS) ────────────────────
    heroEyebrow: "Security awareness, done right",
    featuresEyebrow: "The platform",
    howEyebrow: "How it works",
    complianceEyebrow: "Made in Germany",
    openCoreEyebrow: "Open core",
    pricingEyebrow: "Pricing",
    calculatorEyebrow: "Price calculator",
    faqEyebrow: "FAQ",
    featuresPageEyebrow: "Capabilities",

    // ── Features page ────────────────────────────────────────────────────
    funcTierCore: "Core – free",
    funcTierBusiness: "+ Business",
    funcTierEnterprise: "+ Enterprise",
    funcCtaTitle: "Ready for the full feature set?",
    funcCtaText:
      "Calculate your price or start for free with the Core version.",
    funcCtaPrimary: "Calculate price",
    funcCtaSecondary: "Start Core for free",

    // ── Pricing page ─────────────────────────────────────────────────────
    faqStillQuestions: "Still have questions? Write to us at",

    // ── Meta / SEO ───────────────────────────────────────────────────────
    metaHomeTitle: "HumanShield Awareness – Security awareness that works",
    metaDefaultDesc:
      "HumanShield Awareness – security awareness training and phishing simulations that turn your employees into your strongest line of defense. Built in Germany, GDPR-compliant and NIS2-ready.",
    metaPricingTitle: "Pricing – HumanShield Awareness",
    metaPricingDesc:
      "Transparent pricing for HumanShield Awareness: free Community edition, a Business annual subscription tiered by number of employees, and custom Enterprise offers.",
    metaFeaturesTitle: "Features – HumanShield Awareness",
    metaFeaturesDesc:
      "All HumanShield Awareness features at a glance: what the free Core version, the Business add-on and the Enterprise add-on unlock.",
    titleSuffix: "HumanShield Awareness",

    // ── Pricing cards (PricingTiers.tsx) ─────────────────────────────────
    popular: "Popular",
    priceFree: "Free",
    priceFreeSub: "forever, self-hosted",
    priceOnRequest: "On request",
    priceOnRequestSub: "custom volume pricing",
    priceFrom: "from",
    pricePerEmployeeYear: "/ employee / year",
    priceBusinessSub: "Annual subscription, tiered by number of employees",
    ctaGithub: "Get started on GitHub",
    ctaStartSubscription: "Start annual subscription",
    ctaContact: "Contact us",
    checkoutOpening: "Opening checkout …",
    checkoutUnavailable:
      "Checkout is currently unavailable. Please write to us: ",

    // ── Price calculator (PriceCalculator.tsx) ───────────────────────────
    calcLabel: "How many employees does your company have?",
    calcSliderAria: "Select number of employees",
    calcEnterpriseLead:
      "From {n} employees, we'd be glad to prepare a custom Enterprise offer for you.",
    calcEnterpriseCta: "Request Enterprise offer",
    calcEnterpriseSubject: "HumanShield Enterprise ({n} employees)",
    calcPricePerEmployee: "Price per employee",
    calcPerYear: "/year",
    calcYearlyTotal: "Annual subscription total",
    calcBelowMin:
      "Minimum order: {min} users – the price is calculated for {min}.",
    calcDisclaimer:
      "Business tier · billed annually via Paddle · minimum order {min} users · prices excl. VAT; Paddle shows the correct tax at checkout",
    calcCheckoutBtn: "Start annual subscription for {n} employees",
  },
} as const;

export type UIKey = keyof (typeof ui)["de"];

/** Lokalisierte Tier-Texte für die Preiskarten. Preislogik bleibt in pricing.ts. */
export const tierText = {
  de: {
    community: {
      name: "Community",
      tagline: "Open Core – selbst hosten, frei nutzen",
      features: [
        "Kernfunktionen als Open Source",
        "Self-Hosting auf eigener Infrastruktur",
        "Community-Support über GitHub",
        "Ideal zum Ausprobieren und für kleine Teams",
      ],
    },
    business: {
      name: "Business",
      tagline: "Für Unternehmen bis 2.500 Mitarbeitende",
      features: [
        "Alle Community-Funktionen",
        "Erweiterte Phishing-Simulationen & Kampagnen",
        "Reporting und Auswertungen",
        "Lizenz per E-Mail, offline validierbar",
        "E-Mail-Support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      tagline: "Für große Organisationen ab 2.500 Mitarbeitenden",
      features: [
        "Alle Business-Funktionen",
        "Individuelle Staffelpreise",
        "Onboarding-Unterstützung",
        "Prioritäts-Support",
        "Individuelle Vertragsgestaltung",
      ],
    },
  },
  en: {
    community: {
      name: "Community",
      tagline: "Open Core – self-host and use freely",
      features: [
        "Core features as open source",
        "Self-hosting on your own infrastructure",
        "Community support via GitHub",
        "Ideal for trying it out and for small teams",
      ],
    },
    business: {
      name: "Business",
      tagline: "For companies with up to 2,500 employees",
      features: [
        "All Community features",
        "Advanced phishing simulations & campaigns",
        "Reporting and analytics",
        "License by email, validatable offline",
        "Email support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      tagline: "For large organizations with 2,500+ employees",
      features: [
        "All Business features",
        "Custom volume pricing",
        "Onboarding support",
        "Priority support",
        "Custom contract terms",
      ],
    },
  },
} as const;
