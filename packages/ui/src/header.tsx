"use client";

import Link from "next/link";
import clsx from "clsx";

export type THeaderLink = { label: string; href: string };
export type TNavPosition = "left" | "center" | "right";

interface IHeaderProps {
  title: string;
  links: THeaderLink[];
  navPosition?: TNavPosition;
  className?: string;
}

export function Header({
  title,
  links,
  navPosition = "right",
  className,
}: IHeaderProps) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-20 border-b border-border/50",
        "bg-background/75 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex items-center py-3 sm:py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-wide uppercase text-foreground">
              {title}
            </span>
          </div>

          {/* nav */}
          <nav
            className={clsx(
              "flex items-center gap-1 sm:gap-2",
              navPosition === "left" && "ml-4",
              navPosition === "right" && "ml-auto",
              navPosition === "center" && "absolute left-1/2 -translate-x-1/2",
            )}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-full px-3 py-1.5 text-sm font-medium",
                  "text-foreground/75 hover:text-foreground",
                  "hover:bg-muted/70 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
