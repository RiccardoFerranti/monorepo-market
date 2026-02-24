"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export type TVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  variant?: TVariant;
};

export function Button({ children, className, variant = "primary", ...props }: TButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "cursor-pointer",
        variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
        variant === "secondary" && "bg-muted/60 text-foreground hover:bg-muted/80",
        variant === "outline" &&
          "border-border/70 text-foreground hover:bg-muted/30 border bg-transparent",
        variant === "ghost" &&
          "text-foreground/80 hover:bg-muted/30 hover:text-foreground bg-transparent",
        variant === "danger" && "bg-destructive text-destructive-foreground hover:opacity-90",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
