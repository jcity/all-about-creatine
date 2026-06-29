import Link from "next/link";

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
    <nav aria-label="Breadcrumb" className="wrap">
      <div className="crumbs">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={index} style={{ display: "inline-flex", gap: 8 }}>
              {index > 0 && <span className="sep">›</span>}
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
