"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (!items.length) return null;

  return (
    <nav className="sticky top-20" aria-label="Table of contents">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
        On this page
      </h4>
      <ul className="space-y-1 border-l border-border pl-3 text-sm">
        {items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className={cn(
                "-ml-px border-l-2 pl-3 block py-1 transition-colors",
                activeId === item.url.slice(1)
                  ? "border-primary-500 text-primary-600 font-medium"
                  : "border-transparent text-text-muted hover:text-text-secondary hover:border-border-strong"
              )}
            >
              {item.title}
            </a>
            {item.items?.map((sub) => (
              <a
                key={sub.url}
                href={sub.url}
                className={cn(
                  "-ml-px border-l-2 pl-6 block py-1 text-xs transition-colors",
                  activeId === sub.url.slice(1)
                    ? "border-primary-500 text-primary-600 font-medium"
                    : "border-transparent text-text-muted hover:text-text-secondary hover:border-border-strong"
                )}
              >
                {sub.title}
              </a>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
}
