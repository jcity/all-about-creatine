import { siteConfig } from "@/lib/constants";

interface ContentItem {
  title: string;
  description: string;
  slug: string;
  date: string;
  draft: boolean;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = siteConfig.url;

  let items: { title: string; description: string; url: string; date: string }[] = [];

  try {
    const { guides, reviews, best } = await import("#content");

    const allContent = [
      ...(guides as ContentItem[]).filter((g) => !g.draft).map((g) => ({
        title: g.title,
        description: g.description,
        url: `${baseUrl}/guides/${g.slug}`,
        date: g.date,
      })),
      ...(reviews as ContentItem[]).filter((r) => !r.draft).map((r) => ({
        title: r.title,
        description: r.description,
        url: `${baseUrl}/reviews/${r.slug}`,
        date: r.date,
      })),
      ...(best as ContentItem[]).filter((b) => !b.draft).map((b) => ({
        title: b.title,
        description: b.description,
        url: `${baseUrl}/best/${b.slug}`,
        date: b.date,
      })),
    ];

    items = allContent.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    // Content not yet built
  }

  const lastBuildDate = items.length > 0 ? new Date(items[0].date).toUTCString() : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
