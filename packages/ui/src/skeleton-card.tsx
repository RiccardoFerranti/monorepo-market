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
        "bg-card-foreground/10", // darker base
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_1.3s_linear_infinite]",
        "before:bg-linear-to-r",
        "before:via-foreground/10 before:from-transparent before:to-transparent",
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
        "border-border/60 bg-card overflow-hidden rounded-2xl border shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
