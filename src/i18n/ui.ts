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
    footerTerms: "AGB",
    footerRights: "Alle Rechte vorbehalten.",
    footerPaddlePrefix: "Zahlungsabwicklung über",
    footerPaddleSuffix: "(Merchant of Record)",

    // ── Startseite ───────────────────────────────────────────────────────
    homeSeeAllFeatures: "Alle Funktionen der Add-ons ansehen",
    madeInGermanyBadge: "Made in Germany",

    heroImageAlt:
      "HumanShield Control-Center: Dashboard mit Kampagnen-Übersicht, Risikobewertung und Auswertungen",

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
      "Transparente Preise für HumanShield Awareness: kostenlose Community-Edition, Business-Jahresabo gestaffelt nach Mitarbeiterzahl und Enterprise als Upgrade (+40 %) mit White-Label, SSO und SIEM-Export.",
    metaFeaturesTitle: "Funktionen – HumanShield Awareness",
    metaFeaturesDesc:
      "Alle Funktionen von HumanShield Awareness im Überblick: Was die kostenlose Core-Version, das Business-Add-on und das Enterprise-Add-on freischalten.",
    titleSuffix: "HumanShield Awareness",

    // ── Preiskarten (PricingTiers.tsx) ───────────────────────────────────
    popular: "Beliebt",
    priceFree: "Kostenlos",
    priceFreeSub: "für immer, self-hosted",
    priceFrom: "ab",
    pricePerEmployeeYear: "/ Mitarbeiter:in / Jahr",
    priceBusinessSub: "Jahresabo, gestaffelt nach Mitarbeiterzahl",
    priceEnterpriseSub: "Business + 40 % – nur als Upgrade zum Business-Add-on",
    ctaGithub: "Auf GitHub starten",
    ctaCalculatePrice: "Preis berechnen",
    checkoutOpening: "Checkout wird geöffnet …",
    checkoutUnavailable:
      "Der Checkout ist gerade nicht verfügbar. Bitte schreiben Sie uns: ",

    // ── „Bald verfügbar“-Overlay (ComingSoonOverlay.tsx) ─────────────────
    comingSoonBadge: "Bald verfügbar",
    comingSoonTitle: "Lizenzen bald erhältlich",
    comingSoonText:
      "Wir schließen gerade die letzten Vorbereitungen für den Verkauf ab – der Kauf von Business- und Enterprise-Lizenzen ist in Kürze möglich. Bis dahin steht die kostenlose Core-Version quelloffen auf GitHub bereit.",
    comingSoonGithubCta: "Kostenlose Core-Version auf GitHub",

    // ── Preisrechner (PriceCalculator.tsx) ───────────────────────────────
    calcLabel: "Wie viele Mitarbeitende hat Ihr Unternehmen?",
    calcSliderAria: "Mitarbeiterzahl wählen",
    calcEnterpriseToggle: "Enterprise-Add-on hinzufügen (+40 %)",
    calcEnterpriseHint:
      "Enthält White-Label, SAML-SSO, SIEM-Export und KI-Risikobewertung. Nur zusammen mit dem Business-Add-on buchbar.",
    calcEnterpriseIncluded: "inkl. Enterprise-Upgrade (+40 % auf den Business-Preis)",
    calcPricePerEmployee: "Preis pro Mitarbeiter:in",
    calcPerYear: "/Jahr",
    calcYearlyTotal: "Jahresabo gesamt",
    calcBelowMin:
      "Mindestbestellmenge: {min} Nutzer:innen – der Preis wird für {min} berechnet.",
    calcDisclaimer:
      "Abrechnung jährlich über Paddle · Mindestbestellmenge {min} Nutzer:innen · Preise zzgl. USt., Paddle weist die korrekte Steuer im Checkout aus",
    calcCheckoutBtn: "Jahresabo für {n} Mitarbeitende starten",
    calcCheckoutBtnEnterprise:
      "Business + Enterprise für {n} Mitarbeitende starten",
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
    footerTerms: "Terms & Conditions",
    footerRights: "All rights reserved.",
    footerPaddlePrefix: "Payments processed by",
    footerPaddleSuffix: "(Merchant of Record)",

    // ── Home ─────────────────────────────────────────────────────────────
    homeSeeAllFeatures: "See all add-on features",
    madeInGermanyBadge: "Made in Germany",

    heroImageAlt:
      "HumanShield Control Center: dashboard with campaign overview, risk scoring and analytics",

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
      "Transparent pricing for HumanShield Awareness: free Community edition, a Business annual subscription tiered by number of employees, and Enterprise as an upgrade (+40%) with white-label, SSO and SIEM export.",
    metaFeaturesTitle: "Features – HumanShield Awareness",
    metaFeaturesDesc:
      "All HumanShield Awareness features at a glance: what the free Core version, the Business add-on and the Enterprise add-on unlock.",
    titleSuffix: "HumanShield Awareness",

    // ── Pricing cards (PricingTiers.tsx) ─────────────────────────────────
    popular: "Popular",
    priceFree: "Free",
    priceFreeSub: "forever, self-hosted",
    priceFrom: "from",
    pricePerEmployeeYear: "/ employee / year",
    priceBusinessSub: "Annual subscription, tiered by number of employees",
    priceEnterpriseSub: "Business + 40% – only as an upgrade to the Business add-on",
    ctaGithub: "Get started on GitHub",
    ctaCalculatePrice: "Calculate price",
    checkoutOpening: "Opening checkout …",
    checkoutUnavailable:
      "Checkout is currently unavailable. Please write to us: ",

    // ── “Coming soon” overlay (ComingSoonOverlay.tsx) ────────────────────
    comingSoonBadge: "Coming soon",
    comingSoonTitle: "Licenses available soon",
    comingSoonText:
      "We're putting the final touches on our sales process – purchasing Business and Enterprise licenses will be possible shortly. In the meantime, the free Core version is available as open source on GitHub.",
    comingSoonGithubCta: "Free Core version on GitHub",

    // ── Price calculator (PriceCalculator.tsx) ───────────────────────────
    calcLabel: "How many employees does your company have?",
    calcSliderAria: "Select number of employees",
    calcEnterpriseToggle: "Add the Enterprise add-on (+40%)",
    calcEnterpriseHint:
      "Includes white-label, SAML SSO, SIEM export and AI risk scoring. Only bookable together with the Business add-on.",
    calcEnterpriseIncluded: "incl. Enterprise upgrade (+40% on the Business price)",
    calcPricePerEmployee: "Price per employee",
    calcPerYear: "/year",
    calcYearlyTotal: "Annual subscription total",
    calcBelowMin:
      "Minimum order: {min} users – the price is calculated for {min}.",
    calcDisclaimer:
      "billed annually via Paddle · minimum order {min} users · prices excl. VAT; Paddle shows the correct tax at checkout",
    calcCheckoutBtn: "Start annual subscription for {n} employees",
    calcCheckoutBtnEnterprise: "Start Business + Enterprise for {n} employees",
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
      tagline: "Der volle Funktionsumfang – gestaffelt nach Mitarbeiterzahl",
      features: [
        "Alle Community-Funktionen",
        "Erweiterte Phishing-Simulationen & Kampagnen",
        "Reporting und Auswertungen",
        "Lizenz per E-Mail, gegen Lizenzserver validiert",
        "E-Mail-Support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      tagline: "Business plus Plattform, KI & SSO – als Upgrade (+40 %)",
      features: [
        "Alle Business-Funktionen",
        "White-Label & SAML-SSO",
        "SIEM-Export (Wazuh, Splunk, Sentinel …)",
        "KI-Risikobewertung & automatische Kampagnen",
        "Nur zusammen mit dem Business-Add-on buchbar",
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
      tagline: "The full feature set – tiered by number of employees",
      features: [
        "All Community features",
        "Advanced phishing simulations & campaigns",
        "Reporting and analytics",
        "License by email, validated against license server",
        "Email support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      tagline: "Business plus platform, AI & SSO – as an upgrade (+40%)",
      features: [
        "All Business features",
        "White-label & SAML SSO",
        "SIEM export (Wazuh, Splunk, Sentinel …)",
        "AI risk scoring & automated campaigns",
        "Only bookable together with the Business add-on",
      ],
    },
  },
} as const;
