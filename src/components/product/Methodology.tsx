import { Icon } from "@/components/ui/Icons";

export interface Criterion {
  title: string;
  description: string;
}

interface MethodologyProps {
  heading?: string;
  intro: string;
  criteria: Criterion[];
}

/** "How we tested" methodology block (REDESIGN_SPEC §4.2). */
export function Methodology({
  heading = "How we tested",
  intro,
  criteria,
}: MethodologyProps) {
  return (
    <div className="method not-prose" id="how-we-tested">
      <h2 className="serif">
        <Icon name="flask" /> {heading}
      </h2>
      <p>{intro}</p>
      <div className="crit">
        {criteria.map((c) => (
          <div key={c.title}>
            <span className="ck">
              <Icon name="check" strokeWidth={2.5} />
            </span>
            <span>
              <b>{c.title}</b> — {c.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
