import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type TBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Badge({ children, className, ...props }: TBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none",
        "border border-border/60 bg-background/60 backdrop-blur",
        "text-foreground/80",
        "max-w-20 overflow-hidden",
        "transition-colors hover:bg-background/80 hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="block truncate whitespace-nowrap">{children}</span>
    </span>
  );
}
