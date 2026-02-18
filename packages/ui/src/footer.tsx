"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

interface IFooterProps {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function Footer({ children, className, align = "right" }: IFooterProps) {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <footer className={clsx("border-t border-border/50", className)}>
      <div
        className={clsx(
          "mx-auto max-w-6xl p-6 text-xs text-muted-foreground",
          alignClass,
        )}
      >
        {children ?? "Monorepo demo"}
      </div>
    </footer>
  );
}
