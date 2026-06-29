import { Icon } from "@/components/ui/Icons";

interface CalloutProps {
  /** info/tip/success → teal "note"; warning → amber "warn". */
  type?: "info" | "warning" | "success" | "tip" | "note" | "warn";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const isWarn = type === "warning" || type === "warn";
  const variant = isWarn ? "warn" : "note";
  const defaultTitle = isWarn ? "Important" : "Note";

  return (
    <div className={`callout ${variant} not-prose${className ? ` ${className}` : ""}`}>
      <div className="ct">
        <Icon name={isWarn ? "warning" : "info"} />
        {title ?? defaultTitle}
      </div>
      {children}
    </div>
  );
}
