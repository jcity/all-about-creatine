import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `https://allaboutcreatine.com${path}`;
}

/** "Jun 2026" — compact date for byline/meta rows. */
export function monthYear(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/** Title-cases a slug/category token for display, e.g. "safety" → "Safety". */
export function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
