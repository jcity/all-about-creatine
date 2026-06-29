export interface Reference {
  /** Source / author / title (the cited claim's origin). */
  citation: React.ReactNode;
  /** Outbound URL to the source. */
  url?: string;
  /** Display label for the URL, e.g. "jissn.biomedcentral.com". */
  urlLabel?: string;
}

interface ReferencesProps {
  items: Reference[];
}

/**
 * Numbered References list (REDESIGN_SPEC §3.14). `<Cite n={1} />` superscripts
 * link here via `#refs`. The list order must match the citation numbers.
 */
export function References({ items }: ReferencesProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="refs not-prose" id="refs">
      <h3>References</h3>
      <ol>
        {items.map((ref, i) => (
          <li key={i} id={`ref-${i + 1}`}>
            <cite>{ref.citation}</cite>{" "}
            {ref.url && (
              <a href={ref.url} target="_blank" rel="noopener nofollow">
                {ref.urlLabel ?? ref.url}
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface CiteProps {
  n: number;
}

/** Superscript citation marker linking to the References list. */
export function Cite({ n }: CiteProps) {
  return (
    <sup>
      <a className="cref" href={`#ref-${n}`} aria-label={`Reference ${n}`}>
        {n}
      </a>
    </sup>
  );
}
