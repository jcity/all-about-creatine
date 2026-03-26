import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="mb-8 flex items-start gap-2.5 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-text-secondary">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
      <p>
        This article contains affiliate links. If you make a purchase through these links, we may earn a small
        commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-primary-600 underline hover:text-primary-700">
          Learn more
        </Link>
      </p>
    </div>
  );
}
