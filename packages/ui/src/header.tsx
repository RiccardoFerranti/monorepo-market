"use client";

import Link from "next/link";
import clsx from "clsx";

export type THeaderLink = {
  key: "home" | "products" | "login";
  label: string;
  href: string;
};

export type TNavPosition = "left" | "center" | "right";

export type THeaderProps = {
  title: string;
  titleHref?: string;
  links: THeaderLink[];
  activeKey?: THeaderLink["key"];
  navPosition?: TNavPosition;
  className?: string;
  rightSlot?: React.ReactNode;
};

export function Header({
  title,
  titleHref = "/",
  links,
  activeKey,
  navPosition = "right",
  className,
  rightSlot,
}: THeaderProps) {
  const Nav = (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => {
        const active = link.key === activeKey;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-muted/60 text-foreground"
                : "text-foreground/75 hover:text-foreground hover:bg-muted/40",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
      {rightSlot}
    </nav>
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-20",
        "border-b border-border/70",
        "bg-card/35 backdrop-blur supports-backdrop-filter:bg-card/35",
        "shadow-lg shadow-black/20",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <Link
              href={titleHref}
              className={clsx(
                "text-sm font-semibold tracking-wide uppercase text-foreground",
                "rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={`${title} home`}
            >
              {title}
            </Link>

            {navPosition === "left" ? Nav : null}
          </div>

          <div className="flex justify-center">
            {navPosition === "center" ? Nav : null}
          </div>

          <div className="flex justify-end items-center gap-2">
            {navPosition === "right" ? Nav : null}
          </div>
        </div>
      </div>
    </header>
  );
}
