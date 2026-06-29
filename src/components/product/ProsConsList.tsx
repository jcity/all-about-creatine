import { Icon } from "@/components/ui/Icons";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  /** "box" = tinted boxes (review pages); "list" = inline columns (listicle). */
  variant?: "box" | "list";
  /** Labels — review pages use "What we liked / consider". */
  prosLabel?: string;
  consLabel?: string;
  className?: string;
}

export function ProsConsList({
  pros,
  cons,
  variant = "box",
  prosLabel,
  consLabel,
  className,
}: ProsConsListProps) {
  if (variant === "list") {
    return (
      <div className={`pc-list not-prose${className ? ` ${className}` : ""}`}>
        <div className="pro">
          <h4 className="pro">
            <Icon name="check" /> {prosLabel ?? "Pros"}
          </h4>
          <ul>
            {pros.map((p, i) => (
              <li key={i}>
                <Icon name="check" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="con">
          <h4 className="con">
            <Icon name="x" /> {consLabel ?? "Cons"}
          </h4>
          <ul>
            {cons.map((c, i) => (
              <li key={i}>
                <Icon name="x" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`pc-box not-prose${className ? ` ${className}` : ""}`}>
      <div className="pcbox pro">
        <h4>
          <Icon name="check" /> {prosLabel ?? "What we liked"}
        </h4>
        <ul>
          {pros.map((p, i) => (
            <li key={i}>
              <Icon name="check" /> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="pcbox con">
        <h4>
          <Icon name="x" /> {consLabel ?? "What to consider"}
        </h4>
        <ul>
          {cons.map((c, i) => (
            <li key={i}>
              <Icon name="x" /> {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
