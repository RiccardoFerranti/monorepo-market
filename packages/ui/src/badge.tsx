import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type TBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  truncate?: boolean;
};

export function Badge({
  children,
  className,
  truncate = false,
  ...props
}: TBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none",
        "border border-border bg-border/60 backdrop-blur",
        "text-foreground/80",
        truncate && "max-w-20",
        "transition-colors hover:bg-border/80 hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className={clsx(truncate && "block truncate whitespace-nowrap")}>
        {children}
      </span>
    </span>
  );
}
