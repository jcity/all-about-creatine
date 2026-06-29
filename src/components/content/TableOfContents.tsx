"use client";

import { useEffect, useState } from "react";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

export function TableOfContents({ items, title = "On this page" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (!items.length) return null;

  const flat = items.flatMap((item) => [item, ...(item.items ?? [])]);

  return (
    <nav className="toc" aria-label="Table of contents">
      <h4>{title}</h4>
      {flat.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className={activeId === item.url.slice(1) ? "on" : undefined}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
