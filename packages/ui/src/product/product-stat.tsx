import clsx from "clsx";
import type { ReactNode } from "react";

type TProductStatProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function ProductStat({ label, value, className }: TProductStatProps) {
  return (
    <div className={clsx("bg-background/30 rounded-xl p-4", className)}>
      <div className="text-card-foreground/60 text-xs">{label}</div>

      <div className="text-card-foreground mt-1 text-sm">{value ?? "—"}</div>
    </div>
  );
}
