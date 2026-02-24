import type { HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

type TBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  truncate?: boolean;
};

export function Badge({ children, className, truncate = false, ...props }: TBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none",
        "border-border bg-border/60 border backdrop-blur",
        "text-foreground/80",
        truncate && "max-w-20",
        "hover:bg-border/80 hover:text-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <span className={clsx(truncate && "block truncate whitespace-nowrap")}>{children}</span>
    </span>
  );
}
