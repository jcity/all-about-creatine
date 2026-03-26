import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const config = {
  info: {
    icon: Info,
    bg: "bg-primary-50 border-primary-200",
    iconColor: "text-primary-600",
    titleColor: "text-primary-800",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-800",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-violet-50 border-violet-200",
    iconColor: "text-violet-600",
    titleColor: "text-violet-800",
  },
};

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const { icon: Icon, bg, iconColor, titleColor } = config[type];

  return (
    <div className={cn("my-6 rounded-lg border p-4", bg, className)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />
        <div>
          {title && <p className={cn("mb-1 font-semibold", titleColor)}>{title}</p>}
          <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
}
