import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/content/TableOfContents";
import { AuthorBio } from "@/components/content/AuthorBio";
import { ArticleMeta } from "@/components/content/Bylines";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { TopPickCard } from "@/components/product/SidebarCards";
import { Icon, type IconName } from "@/components/ui/Icons";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface RelatedItem {
  title: string;
  href: string;
  meta?: string;
  icon?: IconName;
}

interface ArticleLayoutProps {
  breadcrumbs: { label: string; href?: string }[];
  category?: string;
  title: string;
  dek: string;
  author: string;
  readMeta: string;
  shareUrl?: string;
  heroIcon?: IconName;
  heroCaption?: string;
  toc?: TocItem[];
  related?: RelatedItem[];
  showDisclosure?: boolean;
  showTopPick?: boolean;
  /** Rendered inside the content column before the prose body (e.g. FAQ accordion). */
  preBody?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Educational article / guide shell (REDESIGN_SPEC §4.4): serif headline, the
 * medically-reviewed meta row (G1), optional hero, two-column reading layout
 * with a sticky TOC + top-pick sidebar, reviewer bio, and related reading.
 */
export function ArticleLayout({
  breadcrumbs,
  category,
  title,
  dek,
  author,
  readMeta,
  shareUrl,
  heroIcon,
  heroCaption,
  toc = [],
  related = [],
  showDisclosure = false,
  showTopPick = true,
  preBody,
  children,
}: ArticleLayoutProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="arthead">
        {category && <span className="cat">{category}</span>}
        <h1 className="serif">{title}</h1>
        <p className="dek">{dek}</p>
        <ArticleMeta
          author={author}
          readMeta={readMeta}
          shareUrl={shareUrl}
          shareTitle={title}
        />
      </div>

      {showDisclosure && (
        <div
          style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}
        >
          <AffiliateDisclosure />
        </div>
      )}

      {heroIcon && (
        <div className="wrap">
          <div className="hero-img">
            <Icon name={heroIcon} strokeWidth={1.4} />
            {heroCaption && <div className="cap">{heroCaption}</div>}
          </div>
        </div>
      )}

      <div className="layout">
        <div className="content">
          {preBody}
          <div className="prose-article">{children}</div>

          <AuthorBio />

          {related.length > 0 && (
            <div className="related not-prose">
              <h3 className="serif">Related reading</h3>
              <div className="rel-grid">
                {related.map((r) => (
                  <Link className="rel" href={r.href} key={r.href}>
                    <span className="ri">
                      <Icon name={r.icon ?? "book"} strokeWidth={1.6} />
                    </span>
                    <span>
                      <b>{r.title}</b>
                      {r.meta && (
                        <>
                          <br />
                          <small>{r.meta}</small>
                        </>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="rail">
          <TableOfContents items={toc} />
          {showTopPick && <TopPickCard heading="Top pick" />}
        </aside>
      </div>
    </>
  );
}
