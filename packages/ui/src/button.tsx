"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export function Button({ children, className, ...props }: TButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        "bg-primary text-primary-foreground hover:opacity-90",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
