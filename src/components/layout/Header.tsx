"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icons";
import { navLinks, siteConfig } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="site">
        <div className="wrap nav">
          <Link className="brand" href="/">
            <span className="logo">
              <Icon name="logo" />
            </span>
            <span>
              {siteConfig.name}
              <small>{siteConfig.tagline}</small>
            </span>
          </Link>

          <nav className="links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "active" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link className="nav-cta" href="/best">
              Top Picks 2026
            </Link>
          </nav>

          <button
            className="hamburger"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          className="nav-cta"
          href="/best"
          onClick={() => setMobileOpen(false)}
        >
          Top Picks 2026
        </Link>
      </div>
    </>
  );
}
