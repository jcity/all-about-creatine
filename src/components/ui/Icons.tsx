import type { ReactElement } from "react";

/**
 * Centralized stroke-based icon set (REDESIGN_SPEC §5: inline SVG, ~1.5–2px,
 * one set — never paste raw SVG ad hoc). Paths are lifted verbatim from the
 * approved mockups. Sizing/stroke color come from CSS context; pass
 * `strokeWidth` to override the default.
 */
export type IconName =
  | "shield"
  | "chart"
  | "checkCircle"
  | "search"
  | "logo"
  | "jar"
  | "trophy"
  | "arrowRight"
  | "external"
  | "check"
  | "x"
  | "info"
  | "warning"
  | "trend"
  | "book"
  | "question"
  | "flask"
  | "bulb"
  | "menu"
  | "shareX"
  | "link"
  | "user"
  | "follicle";

const PATHS: Record<IconName, ReactElement> = {
  shield: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  chart: <path d="M4 19V5M4 19h16M8 16V9M12 16V6M16 16v-4M20 16v-8" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4-4" />
    </>
  ),
  logo: <path d="M12 2v20M5 7l7 4 7-4M5 12l7 4 7-4M5 17l7 4 7-4" />,
  jar: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V5h6v3" />
    </>
  ),
  trophy: <path d="m12 2 3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <path d="M7 17 17 7M9 7h8v8" />,
  check: <path d="m5 12 4 4L19 6" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </>
  ),
  warning: (
    <>
      <path d="M12 2 2 20h20z" />
      <path d="M12 9v5M12 17h.01" />
    </>
  ),
  trend: <path d="M3 17 9 11l4 4 8-8M21 7v5h-5" />,
  book: (
    <>
      <path d="M4 5h12a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H4z" />
      <path d="M4 5v14" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
      <path d="M12 17h.01" />
    </>
  ),
  flask: <path d="M9 3h6M10 3v5L5 18a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3" />,
  bulb: (
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.6.6 1 1.2 1 2h6c0-.8.4-1.4 1-2a7 7 0 0 0-4-12Z" />
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  shareX: <path d="M4 4l16 16M20 4 4 20" />,
  link: (
    <path d="M9 15 15 9M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  follicle: (
    <>
      <path d="M12 3a7 7 0 0 0-7 7c0 3 2 5 2 8h10c0-3 2-5 2-8a7 7 0 0 0-7-7Z" />
      <path d="M9 11a3 3 0 0 1 6 0" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
}

export function Icon({
  name,
  strokeWidth = 2,
  className,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      {PATHS[name]}
    </svg>
  );
}
