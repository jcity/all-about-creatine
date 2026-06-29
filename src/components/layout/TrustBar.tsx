import { Icon, type IconName } from "@/components/ui/Icons";
import { trustBarItems } from "@/lib/constants";

interface TrustBarProps {
  items?: readonly { icon: string; label: string }[];
}

/**
 * Thin navy strip above the header — gold-iconed credibility signals (G1).
 */
export function TrustBar({ items = trustBarItems }: TrustBarProps) {
  return (
    <div className="trustbar">
      <div className="wrap">
        {items.map((item) => (
          <span key={item.label}>
            <Icon name={item.icon as IconName} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
