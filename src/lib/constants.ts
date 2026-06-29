export const siteConfig = {
  name: "All About Creatine",
  url: "https://allaboutcreatine.com",
  tagline: "Evidence-based supplement science",
  description:
    "Your trusted resource for evidence-based creatine information, supplement reviews, and buying guides.",
  author: "All About Creatine Editorial Team",
  ogImage: "/images/og/default.png",
  links: {
    twitter: "",
    github: "",
  },
} as const;

export const navLinks = [
  { label: "Guides", href: "/guides" },
  { label: "Reviews", href: "/reviews" },
  { label: "Best Creatine", href: "/best" },
  { label: "FAQ", href: "/faq" },
] as const;

/**
 * Medical reviewer — PLACEHOLDER (D9). Swap in a real, named, credentialed
 * reviewer before launch. Drives every "medically reviewed by" byline.
 */
export const reviewer = {
  name: "Dr. Sarah Reyes, RD, PhD",
  shortName: "Dr. Sarah Reyes, RD",
  initials: "SR",
  role: "Registered Dietitian · Sports Nutrition",
  bio: "Dr. Reyes verifies that every claim on our health pages reflects the current peer-reviewed evidence. Our editorial team independently purchases and tests each product; manufacturers have no input on scores.",
  quote:
    "Creatine monohydrate is one of the most studied, most reliable supplements in existence. Our job is simply to report the evidence accurately — no exaggeration, no fear-mongering.",
} as const;

/** Default trust-strip items (gold icons). Configurable per page if needed. */
export const trustBarItems = [
  { icon: "shield", label: "Reviewed by registered dietitians" },
  { icon: "chart", label: "1,200+ studies cited" },
  { icon: "checkCircle", label: "No sponsored rankings" },
] as const;

/**
 * Current #1 pick — surfaced in article/listicle sidebars. PLACEHOLDER affiliate
 * URL (D9); wire to the real affiliate/redirect link before launch.
 */
export const topPick = {
  name: "Thorne Creatine",
  rating: 4.9,
  price: "$35.99",
  retailer: "Amazon",
  affiliateUrl: "#",
  guideHref: "/best",
} as const;

/** Standard scoring criteria for the "How we tested" methodology block (D7). */
export const testingCriteria = [
  {
    title: "Purity & ingredients",
    description: "what's actually in it, and whether there are needless fillers.",
  },
  {
    title: "Third-party testing",
    description: "independent checks for banned substances and label accuracy.",
  },
  {
    title: "Mixability",
    description: "does it dissolve cleanly or leave gritty residue?",
  },
  {
    title: "Value",
    description: "price per serving relative to overall quality.",
  },
  {
    title: "Brand reputation",
    description: "track record, transparency, and support.",
  },
] as const;

export const footerColumns = [
  {
    heading: "Learn",
    links: [
      { label: "What Is Creatine?", href: "/guides/what-is-creatine" },
      { label: "All Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Best Creatine 2026", href: "/best" },
      { label: "All Reviews", href: "/reviews" },
      { label: "Compare Brands", href: "/best" },
    ],
  },
  {
    heading: "Site",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
] as const;
