import Link from "next/link";
import { siteConfig } from "@/lib/constants";

const footerLinks = {
  learn: [
    { label: "What Is Creatine?", href: "/guides/what-is-creatine" },
    { label: "All Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
  ],
  products: [
    { label: "Best Creatine 2026", href: "/best/creatine-supplements-2026" },
    { label: "All Reviews", href: "/reviews" },
    { label: "Compare Brands", href: "/best" },
  ],
  site: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-lg">
              <span className="text-primary-600">All About</span> Creatine
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {siteConfig.description}
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Learn
            </h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Products
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Site
            </h3>
            <ul className="space-y-2">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1">
            This site contains affiliate links. See our{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-primary-600">
              affiliate disclosure
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
    </footer>
  );
}
