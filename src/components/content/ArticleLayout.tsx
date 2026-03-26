import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/content/TableOfContents";
import { AuthorBio } from "@/components/content/AuthorBio";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
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
  children,
}: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={breadcrumbs} />

      <article>
        {/* Header */}
        <header className="mb-8">
          {category && (
            <Badge variant="primary" className="mb-3">
              {category}
            </Badge>
          )}
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mb-4 text-lg text-text-secondary">{description}</p>
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
              <TableOfContents items={toc} />
              <div className="mt-8">
                <NewsletterSignup />
              </div>
            </aside>
          )}
        </div>

        {/* Author bio */}
        <AuthorBio name={author} />
      </article>
    </div>
  );
}
