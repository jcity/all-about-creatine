"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-border rounded-lg border border-border", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-5 py-4 text-left font-medium transition-colors hover:bg-surface-muted"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={cn(
                "ml-2 h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4 text-text-secondary leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
