import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReviewerCard } from "@/components/content/ReviewerCard";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { StarRating } from "@/components/ui/StarRating";
import { Icon, type IconName } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/constants";

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  category?: string;
  draft: boolean;
  updatedDate?: string;
  metadata?: { readingTime?: string };
}

async function getFeatured() {
  try {
    const { guides, best } = await import("#content");
    const g = (guides as ContentItem[]).filter((x) => !x.draft);
    const b = (best as ContentItem[]).filter((x) => !x.draft);
    return { guides: g, best: b };
  } catch {
    return { guides: [] as ContentItem[], best: [] as ContentItem[] };
  }
}

const heroPicks = [
  { rank: 1, name: "Thorne Creatine", rating: 5, sub: "NSF Certified · Creapure", price: "$35.99" },
  { rank: 2, name: "Optimum Nutrition", rating: 4.5, sub: "Best value · Micronized", price: "$21.99" },
  { rank: 3, name: "Transparent Labs", rating: 4.5, sub: "Best formula · +HMB", price: "$39.99" },
];

const pillars: { icon: IconName; title: string; body: string; href: string; cta: string }[] = [
  {
    icon: "book",
    title: "In-Depth Guides",
    body: "Research-backed articles covering creatine basics, dosing protocols, and safety — written plainly and cited carefully.",
    href: "/guides",
    cta: "Browse guides",
  },
  {
    icon: "trend",
    title: "Product Rankings",
    body: "Hands-on reviews and side-by-side comparisons scored on purity, third-party testing, mixability, and value.",
    href: "/best",
    cta: "See rankings",
  },
  {
    icon: "question",
    title: "Common Questions",
    body: "Clear answers to what people actually ask: hair loss, kidney concerns, loading phases, timing, and more.",
    href: "/faq",
    cta: "Read the FAQ",
  },
];

export default async function HomePage() {
  const { guides, best } = await getFeatured();
  const thumbs = ["thumb", "thumb alt", "thumb alt2"];
  const featured: {
    title: string;
    href: string;
    description: string;
    tag: string;
    meta: string;
    icon: IconName;
  }[] = [];

  guides.slice(0, 2).forEach((g) => {
    featured.push({
      title: g.title,
      href: `/guides/${g.slug}`,
      description: g.description,
      tag: g.category === "safety" ? "Safety" : "Guide",
      meta: `Medically reviewed · ${g.metadata?.readingTime ?? "8"} min read`,
      icon: "logo",
    });
  });
  if (best[0]) {
    featured.push({
      title: best[0].title,
      href: `/best/${best[0].slug}`,
      description: best[0].description,
      tag: "Ranking",
      meta: "Updated Jun 2026 · 12 min read",
      icon: "trend",
    });
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />

      {/* Hero */}
      <div className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">
              <Icon name="shield" /> Independent · Research-backed · Updated June 2026
            </span>
            <h1 className="hero-h serif">
              The clear, clinical guide to creatine that actually works.
            </h1>
            <p className="lead">
              Plain-English science, lab-checked product rankings, and honest
              reviews — so you can choose creatine with confidence.
            </p>
            <div className="btnrow">
              <Link className="btn btn-primary" href="/best">
                See our 2026 top picks <Icon name="arrowRight" />
              </Link>
              <Link className="btn btn-ghost" href="/guides/what-is-creatine">
                Start with the basics
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <b>30+ yrs</b>
                <span>of clinical research</span>
              </div>
              <div>
                <b>20+</b>
                <span>products lab-evaluated</span>
              </div>
              <div>
                <b>100%</b>
                <span>editorially independent</span>
              </div>
            </div>
          </div>

          <div className="hcard">
            <div className="hcard-top">
              <b>Best Creatine 2026</b>
              <span>Lab-verified</span>
            </div>
            <div className="hcard-body">
              {heroPicks.map((p) => (
                <Link className="prow" href="/best" key={p.rank}>
                  <span className={`rank${p.rank === 1 ? " one" : ""}`}>
                    {p.rank}
                  </span>
                  <span className="pthumb">
                    <Icon name="jar" />
                  </span>
                  <span className="pinfo">
                    <b>{p.name}</b>
                    <StarRating rating={p.rating} />
                    <br />
                    <span>{p.sub}</span>
                  </span>
                  <span className="pprice">{p.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">
              <Icon name="search" /> Where to start
            </span>
            <h2 className="serif">Three ways to get the answer you need</h2>
            <p>
              Whether you&apos;re researching the science or ready to buy,
              everything is organized around one goal: giving you trustworthy
              information fast.
            </p>
          </div>
          <div className="grid3">
            {pillars.map((p) => (
              <div className="pillar" key={p.href}>
                <div className="picon">
                  <Icon name={p.icon} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link className="more" href={p.href}>
                  {p.cta} <Icon name="arrowRight" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority band */}
      <div className="authority">
        <section className="band">
          <div className="wrap">
            <div className="auth-grid">
              <div>
                <span className="eyebrow">
                  <Icon name="shield" /> Our standards
                </span>
                <h2 className="serif">Why you can trust what you read here</h2>
                <p>
                  Supplement marketing is noisy. We hold our content to a clinical
                  standard so you don&apos;t have to wade through hype to find the
                  truth.
                </p>
                <ul className="checklist">
                  {[
                    "Every claim is linked to peer-reviewed research or major health bodies (ISSN, NIH).",
                    "Reviews are medically checked by registered dietitians before publishing.",
                    "Rankings can't be bought — affiliate partners get no say in scoring.",
                    'Pages show a clear "last updated" date and revision history.',
                  ].map((item) => (
                    <li key={item}>
                      <span className="ck">
                        <Icon name="check" strokeWidth={2.5} />
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ReviewerCard />
            </div>
          </div>
        </section>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <Icon name="book" /> Most read
              </span>
              <h2 className="serif">Popular guides &amp; reviews</h2>
            </div>
            <div className="grid-art">
              {featured.map((f, i) => (
                <Link className="acard" href={f.href} key={f.href}>
                  <div className={thumbs[i % 3]}>
                    <span className="tag">{f.tag}</span>
                    <Icon name={f.icon} strokeWidth={1.5} />
                  </div>
                  <div className="abody">
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                    <div className="ameta">
                      {f.meta.split(" · ")[0]}
                      <span className="dot" />
                      {f.meta.split(" · ")[1]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <div className="wrap" style={{ marginBottom: 40 }}>
        <div className="ctaband">
          <h2 className="serif">Not sure which creatine to buy?</h2>
          <p>
            Skip the guesswork. Our 2026 buyer&apos;s guide compares the top
            products head-to-head so you can pick the right one in minutes.
          </p>
          <Link className="btn btn-primary" href="/best">
            View the comparison <Icon name="arrowRight" />
          </Link>
        </div>
      </div>

      {/* Newsletter (secondary) */}
      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
