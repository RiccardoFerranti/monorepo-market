"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export type THeaderLink = { label: string; href: string };
export type TNavPosition = "left" | "center" | "right";

type THeaderProps = {
  title: string;
  links: THeaderLink[];
  navPosition?: TNavPosition;
  className?: string;
};

function normalize(path: string) {
  // Remove trailing slash except root
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/**
 * Decide if a link is active.
 * - exact match for home/login
 * - "products" should be active for both:
 *   /en/products AND /en/product/[id]
 */
function isActiveLink(currentPath: string, href: string) {
  const cur = normalize(currentPath);
  const target = normalize(href);

  if (cur === target) return true;

  // Special case: Products section includes product details
  // e.g. target = /en/products  should match  /en/product/3
  if (target.endsWith("/products")) {
    const base = target.replace(/\/products$/, "");
    return cur === `${base}/products` || cur.startsWith(`${base}/product/`);
  }

  return false;
}

export function Header({
  title,
  links,
  navPosition = "right",
  className,
}: THeaderProps) {
  const pathname = usePathname();

  const Nav = (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => {
        const active = isActiveLink(pathname, link.href);

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
          {/* COL 1 */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wide uppercase text-foreground">
              {title}
            </span>

            {/* Nav LEFT = lives in col 1, after title */}
            {navPosition === "left" ? Nav : null}
          </div>

          {/* COL 2 (center) */}
          <div className="flex justify-center">
            {navPosition === "center" ? Nav : null}
          </div>

          {/* COL 3 (right) */}
          <div className="flex justify-end">
            {navPosition === "right" ? Nav : null}
          </div>
        </div>
      </div>
    </header>
  );
}
