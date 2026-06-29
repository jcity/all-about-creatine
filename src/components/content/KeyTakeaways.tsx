import { Icon } from "@/components/ui/Icons";

interface KeyTakeawaysProps {
  items?: React.ReactNode[];
  heading?: string;
  /** Alternatively pass <li> items as children. */
  children?: React.ReactNode;
}

/** Mint key-takeaways box at the top of articles (REDESIGN_SPEC §3.12, D8). */
export function KeyTakeaways({
  items,
  heading = "Key takeaways",
  children,
}: KeyTakeawaysProps) {
  return (
    <div className="takeaways not-prose">
      <h4>
        <Icon name="bulb" /> {heading}
      </h4>
      <ul>
        {items
          ? items.map((item, i) => (
              <li key={i}>
                <Icon name="check" /> <span>{item}</span>
              </li>
            ))
          : children}
      </ul>
    </div>
  );
}
