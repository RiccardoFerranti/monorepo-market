import clsx from "clsx";
import type { ReactNode } from "react";

type ProductStatProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function ProductStat({ label, value, className }: ProductStatProps) {
  return (
    <div className={clsx("rounded-xl bg-background/30 p-4", className)}>
      <div className="text-xs text-card-foreground/60">{label}</div>

      <div className="mt-1 text-sm text-card-foreground">{value ?? "—"}</div>
    </div>
  );
}
