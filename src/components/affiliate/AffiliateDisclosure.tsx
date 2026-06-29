import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="mt-10 flex items-start gap-2.5 rounded-xl border border-border bg-surface-raised px-5 py-4 text-sm text-text-secondary not-prose">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>
        <strong>Disclosure:</strong> This site contains affiliate links. If you make a purchase through our links, we may earn a commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-primary underline hover:text-primary-dark">
          Full affiliate disclosure
        </Link>
      </p>
    </div>
  );
}
