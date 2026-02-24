"use client";

import * as React from "react";
import Image from "next/image";
import clsx from "clsx";

type TProductGalleryProps = {
  title: string;
  primary: string;
  thumbs: string[];
  className?: string;
};

export function ProductGallery({ title, thumbs, primary, className }: TProductGalleryProps) {
  const [active, setActive] = React.useState(thumbs[0] || primary || "");

  React.useEffect(() => {
    setActive(thumbs[0] || primary || "");
  }, [thumbs, primary]);

  return (
    <section className={className}>
      <div className="bg-muted/25 relative aspect-square w-full rounded-xl">
        {active ? (
          <Image
            src={active}
            alt={title}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
          />
        ) : null}
      </div>

      {thumbs.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {thumbs.map((src) => {
            const isActive = src === active;

            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                aria-label={`Show image for ${title}`}
                aria-pressed={isActive}
                className={clsx(
                  "h-12 w-12 overflow-hidden rounded-lg",
                  "transition-all duration-200",
                  "focus-visible:ring-ring focus:outline-none focus-visible:ring-2",
                  "cursor-pointer",

                  // base (non-active)
                  !isActive && "bg-muted/85 ring-border/70 ring-1",

                  // active (exact final look)
                  isActive && "bg-muted ring-border ring-2",

                  // hover and active are the same
                  !isActive && "hover:bg-muted hover:ring-border hover:ring-2",
                )}
              >
                <Image
                  src={src}
                  alt={`${title} thumbnail`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-2 opacity-90"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
