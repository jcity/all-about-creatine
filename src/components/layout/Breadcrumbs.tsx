import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
