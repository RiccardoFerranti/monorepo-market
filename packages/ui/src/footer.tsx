"use client";

import type { ReactNode } from "react";

import clsx from "clsx";

type TFooterProps = {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

export function Footer({ children, className, align = "right" }: TFooterProps) {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <footer className={clsx("border-border/70 bg-card/35 border-t", className)}>
      <div className={clsx("text-foreground/55 mx-auto max-w-6xl p-6 text-xs", alignClass)}>
        {children ?? "Monorepo demo"}
      </div>
    </footer>
  );
}
