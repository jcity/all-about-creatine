import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsConsList({ pros, cons, className }: ProsConsListProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <h4 className="mb-2 font-semibold text-emerald-800">Pros</h4>
        <ul className="space-y-1.5">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h4 className="mb-2 font-semibold text-red-800">Cons</h4>
        <ul className="space-y-1.5">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
