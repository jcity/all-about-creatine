export interface BreakdownBar {
  label: string;
  score: number;
  max?: number;
}

interface RatingBreakdownProps {
  bars: BreakdownBar[];
}

/**
 * Labeled horizontal score bars (Purity / Testing / Mixability / Value) for the
 * review hero (REDESIGN_SPEC §3.8).
 */
export function RatingBreakdown({ bars }: RatingBreakdownProps) {
  if (!bars || bars.length === 0) return null;
  return (
    <div className="ratingbars">
      {bars.map((bar) => {
        const max = bar.max ?? 5;
        const pct = Math.max(0, Math.min(100, (bar.score / max) * 100));
        return (
          <div className="rbar" key={bar.label}>
            <span>{bar.label}</span>
            <div className="track">
              <div className="fill" style={{ width: `${pct}%` }} />
            </div>
            <b>{bar.score.toFixed(1)}</b>
          </div>
        );
      })}
    </div>
  );
}
