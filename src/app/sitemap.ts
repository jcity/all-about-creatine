import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/best`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic content pages — imported at build time
  let contentPages: MetadataRoute.Sitemap = [];
  try {
    const { guides, reviews, best, faqs } = await import("#content");

    const guidePages = guides
      .filter((g: { draft: boolean }) => !g.draft)
      .map((g: { slug: string; date: string }) => ({
        url: `${baseUrl}/guides/${g.slug}`,
        lastModified: new Date(g.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    const reviewPages = reviews
      .filter((r: { draft: boolean }) => !r.draft)
      .map((r: { slug: string; date: string }) => ({
        url: `${baseUrl}/reviews/${r.slug}`,
        lastModified: new Date(r.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    const bestPages = best
      .filter((b: { draft: boolean }) => !b.draft)
      .map((b: { slug: string; date: string }) => ({
        url: `${baseUrl}/best/${b.slug}`,
        lastModified: new Date(b.date),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }));

    const faqPages = faqs
      .filter((f: { draft: boolean }) => !f.draft)
      .map((f: { slug: string; date: string }) => ({
        url: `${baseUrl}/faq/${f.slug}`,
        lastModified: new Date(f.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    contentPages = [...guidePages, ...reviewPages, ...bestPages, ...faqPages];
  } catch {
    // Content not yet built
  }

  return [...staticPages, ...contentPages];
}
