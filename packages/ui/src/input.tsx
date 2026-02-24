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
        "border-border bg-background/40 mt-1 w-full rounded-xl border px-3 py-2 text-sm",
        "focus:ring-ring outline-none focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}
