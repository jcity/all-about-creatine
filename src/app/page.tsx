import Link from "next/link";
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
      <section className="border-b border-border bg-gradient-to-b from-primary-50 to-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything You Need to Know About{" "}
              <span className="text-primary-600">Creatine</span>
            </h1>
            <p className="mb-8 text-lg text-text-secondary sm:text-xl">
              Evidence-based guides, honest supplement reviews, and expert
              recommendations to help you make informed decisions about creatine
              supplementation.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/guides/what-is-creatine"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
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

      {/* Featured sections */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="In-Depth Guides"
            description="Comprehensive, research-backed articles covering everything from creatine basics to advanced dosing protocols."
            href="/guides"
            linkText="Browse Guides"
          />
          <FeatureCard
            icon={<Award className="h-6 w-6" />}
            title="Product Rankings"
            description="Hands-on reviews and side-by-side comparisons of the top creatine supplements on the market."
            href="/best"
            linkText="See Rankings"
          />
          <FeatureCard
            icon={<HelpCircle className="h-6 w-6" />}
            title="FAQ"
            description="Clear, concise answers to the most common questions about creatine supplementation."
            href="/faq"
            linkText="Read FAQ"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <h2 className="mb-2 text-2xl font-bold">Stay in the Loop</h2>
          <p className="mb-6 text-text-secondary">
            Get the latest creatine research and reviews delivered to your inbox.
          </p>
          <NewsletterSignup variant="inline" />
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 flex-1 text-sm text-text-secondary">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
      >
        {linkText}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
