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

// Top navigation. "Groups" carries a dropdown of thematic sub-groups; every
// other item is one click. The join CTA lives separately in the header.
export type NavChild = { key: string; href: string };
export type NavItem = { key: string; href: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/presentation" },
  { key: "events", href: "/evenements" },
  { key: "universities", href: "/universites" },
  {
    key: "groups",
    href: "/groupes",
    children: [
      { key: "entrepreneurship", href: "/groupes#entrepreneuriat" },
      { key: "investing", href: "/groupes#investir" },
      { key: "agriculture", href: "/groupes#agriculture" },
      { key: "finance", href: "/groupes#finance" },
    ],
  },
  { key: "training", href: "/formation" },
];

// Thematic groups shown on /groupes. `leader`/`email`/`created` are optional —
// most are still being formed.
export const groups = [
  {
    slug: "entrepreneuriat",
    key: "entrepreneurship",
    created: "2006",
  },
  {
    slug: "investir",
    key: "investing",
    created: "2006",
  },
  { slug: "agriculture", key: "agriculture" },
  { slug: "finance", key: "finance" },
] as const;

// University alumni sub-groups. Most are being constituted; a few have a
// designated lead. Extend this list as chapters open.
export const universities = [
  { name: "HEC Paris", city: "Jouy-en-Josas", created: 2006 },
  { name: "ESCP Business School", city: "Paris", created: 2005 },
  { name: "ESSEC", city: "Cergy", created: 2007 },
  { name: "Télécom Paris", city: "Palaiseau", created: 2008 },
  { name: "École Polytechnique", city: "Palaiseau" },
  { name: "Sciences Po", city: "Paris" },
  { name: "Université Paris-Dauphine", city: "Paris" },
  { name: "Mines Paris - PSL", city: "Paris" },
  { name: "CentraleSupélec", city: "Gif-sur-Yvette" },
  { name: "INSEAD", city: "Fontainebleau" },
  { name: "EM Lyon", city: "Lyon" },
  { name: "Université de Montréal", city: "Montréal" },
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
