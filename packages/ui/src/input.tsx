"use client";

import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className, id, ...props }: TInputProps) {
  return (
    <input
      id={id}
      className={clsx(
        "mt-1 w-full rounded-xl border border-border bg-background/40 px-3 py-2 text-sm",
        "outline-none focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
