// Central site configuration. External URLs are placeholders until REAGE
// provides the real HelloAsso campaign / LinkedIn links.
export const site = {
  name: "REAGE",
  longName: "Réseau des cadres et entrepreneurs Algériens d'Europe",
  email: "contact@reage.org",
  founded: 2006,
  linkedinUrl: "https://www.linkedin.com/company/reageorg/",
  // A single HelloAsso entry point: the membership/join page where donations,
  // free membership and paying tiers all live. Money never touches this site.
  // TODO: replace with REAGE's real HelloAsso slug once provided.
  joinUrl: "https://www.helloasso.com/associations/reage/adhesions/adhesion",
} as const;

// Flat top-level navigation — guarantees every page is one click from the
// header and every detail page is at most two clicks.
export const navItems = [
  { key: "about", href: "/presentation" },
  { key: "training", href: "/formation" },
  { key: "events", href: "/evenements" },
  { key: "news", href: "/actualites" },
  { key: "membership", href: "/adhesion" },
  { key: "contact", href: "/contact" },
] as const;

// Partner organisations carried over from the current reage.org.
export const partners = [
  "CCIAF",
  "CAC",
  "Business France",
  "KPMG",
  "BNP Paribas El Djazaïr",
  "Danone",
  "Algérie Télécom",
  "Cevital",
  "El Moudjahid",
  "TSA",
  "Berbère Télévision",
  "Beur FM",
] as const;
