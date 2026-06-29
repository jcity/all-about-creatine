interface StarRatingProps {
  rating: number;
  maxRating?: number;
  /** Kept for API compatibility; visual size comes from CSS context. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Gold star glyphs (matches the mockups' ★★★★½ treatment). Accessible:
 * exposes the numeric value via aria-label, glyphs are decorative.
 */
export function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  const full = Math.floor(rating);
  const frac = rating - full;
  const hasHalf = frac >= 0.25 && frac < 0.75;
  const roundUp = frac >= 0.75;
  const fullCount = roundUp ? full + 1 : full;
  const empty = Math.max(0, maxRating - fullCount - (hasHalf ? 1 : 0));

  const glyphs = "★".repeat(fullCount) + (hasHalf ? "½" : "") + "☆".repeat(empty);

  return (
    <span
      className={`stars${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {glyphs}
    </span>
  );
}
