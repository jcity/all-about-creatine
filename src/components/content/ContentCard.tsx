import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icons";

interface ContentCardProps {
  href: string;
  tag: string;
  title: string;
  description: string;
  meta?: string;
  icon?: IconName;
  /** 0/1/2 → rotates the gradient thumbnail variant. */
  index?: number;
}

const thumbVariants = ["thumb", "thumb alt", "thumb alt2"];

export function ContentCard({
  href,
  tag,
  title,
  description,
  meta,
  icon = "logo",
  index = 0,
}: ContentCardProps) {
  return (
    <Link className="acard" href={href}>
      <div className={thumbVariants[index % 3]}>
        <span className="tag">{tag}</span>
        <Icon name={icon} strokeWidth={1.5} />
      </div>
      <div className="abody">
        <h3>{title}</h3>
        <p>{description}</p>
        {meta && (
          <div className="ameta">
            {meta.includes(" · ") ? (
              <>
                {meta.split(" · ")[0]}
                <span className="dot" />
                {meta.split(" · ")[1]}
              </>
            ) : (
              meta
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
