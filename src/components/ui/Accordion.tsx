"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/** FAQ Q&A blocks (`.qa`) — collapsible for usability, styled per the mockups. */
export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`not-prose${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div className="qa" key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
              }}
            >
              <b style={{ margin: 0 }}>{item.question}</b>
              <span
                aria-hidden
                style={{
                  color: "var(--teal)",
                  fontSize: 20,
                  lineHeight: 1,
                  transform: open ? "rotate(45deg)" : "none",
                  transition: "transform .15s",
                  flex: "none",
                }}
              >
                +
              </span>
            </button>
            {open && <p style={{ marginTop: 6 }}>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
