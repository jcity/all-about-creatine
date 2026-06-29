import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/content/TableOfContents";
import { AuthorBio } from "@/components/content/AuthorBio";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface RelatedPost {
  title: string;
  slug: string;
  description: string;
  category: string;
}

interface ArticleLayoutProps {
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  author: string;
  category?: string;
  readingTime?: string;
  breadcrumbs: { label: string; href?: string }[];
  toc?: TocItem[];
  relatedPosts?: RelatedPost[];
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  updatedDate,
  author,
  category,
  readingTime,
  breadcrumbs,
  toc = [],
  relatedPosts = [],
  children,
}: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={breadcrumbs} />

      <article>
        {/* Header */}
        <header className="mb-10">
          {category && (
            <Badge variant="primary" className="mb-4">
              {category}
            </Badge>
          )}
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mb-5 text-lg text-text-secondary leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            {updatedDate && (
              <span className="text-xs">
                (Updated {formatDate(updatedDate)})
              </span>
            )}
            {readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readingTime}</span>
              </div>
            )}
            <span>By {author}</span>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="flex gap-10">
          {/* Main content */}
          <div className="prose prose-lg min-w-0 flex-1">{children}</div>

          {/* Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <TableOfContents items={toc} />
                <div className="mt-8">
                  <NewsletterSignup />
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Author bio */}
        <div className="mt-12">
          <AuthorBio name={author} date={date} readingTime={readingTime} />
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14 border-t border-border pt-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Continue reading
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getPostHref(post.category, post.slug)}
                  className="group flex flex-col rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-base font-semibold group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

function getPostHref(category: string, slug: string): string {
  if (["basics", "dosage", "benefits", "safety", "science", "types"].includes(category)) {
    return `/guides/${slug}`;
  }
  if (category === "comparison" || slug.startsWith("best/")) {
    return `/best/${slug}`;
  }
  return `/guides/${slug}`;
}
