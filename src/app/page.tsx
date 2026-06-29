"use client";

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Award, HelpCircle } from "lucide-react";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Evidence-Based Supplement Guide
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need to know about <span className="text-primary">creatine</span>
            </h1>
            <p className="mb-8 text-lg text-text-secondary sm:text-xl leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/guides/what-is-creatine"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/best/creatine-supplements-2026"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-6 py-3 font-semibold transition-colors hover:bg-surface-muted"
              >
                Best Creatine 2026
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <BookOpen className="h-5 w-5" />, label: "In-Depth Guides", href: "/guides" },
            { icon: <Award className="h-5 w-5" />, label: "Product Rankings", href: "/best" },
            { icon: <HelpCircle className="h-5 w-5" />, label: "FAQ", href: "/faq" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-primary/30 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </span>
              <span className="font-semibold group-hover:text-primary">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Stay in the loop
          </h2>
          <p className="mb-6 text-text-secondary">
            Get the latest creatine research and reviews delivered to your inbox.
          </p>
          <NewsletterSignup variant="inline" />
        </div>
      </section>
    </>
  );
}
