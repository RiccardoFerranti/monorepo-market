"use client";

import clsx from "clsx";

type TSSkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className }: TSSkeletonBlockProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md",
        "bg-card-foreground/20", // darker base
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_1.3s_linear_infinite]",
        "before:bg-linear-to-r",
        "before:from-transparent before:via-foreground/20 before:to-transparent",
        className,
      )}
    />
  );
}

type TSkeletonCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function SkeletonCard({ className, children }: TSkeletonCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
