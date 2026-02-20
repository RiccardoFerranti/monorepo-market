"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

type TFooterProps = {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

export function Footer({ children, className, align = "right" }: TFooterProps) {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <footer className={clsx("border-t border-border/70 bg-card/35", className)}>
      <div
        className={clsx(
          "mx-auto max-w-6xl p-6 text-xs text-foreground/55",
          alignClass,
        )}
      >
        {children ?? "Monorepo demo"}
      </div>
    </footer>
  );
}
