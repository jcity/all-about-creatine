export const siteConfig = {
  name: "All About Creatine",
  url: "https://allaboutcreatine.com",
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
