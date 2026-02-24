import clsx from "clsx";

import type { IProductCardConfig } from "@repo/types";

import { SkeletonBlock, SkeletonCard } from "../skeleton-card";

type TProductCardSkeletonProps = {
  config: IProductCardConfig;
  className?: string;
};
export function ProductCardSkeleton({ config, className }: TProductCardSkeletonProps) {
  const isVertical = config.layout === "vertical";
  const showThumbs = config.thumbnails > 0;
  const showTags = config.showCategories;

  // shared blocks
  const Title = <SkeletonBlock className="h-4 w-2/3 rounded-md" />;
  const Desc = (
    <div className="mt-3 space-y-2">
      <SkeletonBlock className="h-3 w-full rounded-md" />
      <SkeletonBlock className="h-3 w-5/6 rounded-md" />
    </div>
  );
  const Price = <SkeletonBlock className="h-4 w-16 rounded-md" />;

  const MediaVertical = (
    <div className="p-3">
      <SkeletonBlock className="h-44 w-full rounded-xl" />
      {showThumbs ? (
        <div className="mt-2 flex gap-2">
          {Array.from({ length: config.thumbnails }).map((_, i) => (
            <SkeletonBlock key={i} className="h-12 w-12 rounded-lg" />
          ))}
        </div>
      ) : null}
    </div>
  );

  const MediaHorizontal = (
    <div className="border-border/40 h-full border-r p-3">
      <SkeletonBlock className="h-32 w-full rounded-xl" />
      {showThumbs ? (
        <div className="mt-2 flex gap-2">
          {Array.from({ length: config.thumbnails }).map((_, i) => (
            <SkeletonBlock key={i} className="h-10 w-10 rounded-lg" />
          ))}
        </div>
      ) : null}
    </div>
  );

  const Tags = showTags ? (
    <div className="mt-3 flex flex-wrap gap-2">
      <SkeletonBlock className="h-5 w-14 rounded-full" />
      <SkeletonBlock className="h-5 w-16 rounded-full" />
    </div>
  ) : null;

  // titlePlacement affects ONLY title placement (not everything)
  const titleOnTop = config.titlePlacement.startsWith("top");

  return (
    <SkeletonCard
      className={clsx(isVertical ? "flex flex-col" : "grid grid-cols-[140px_1fr]", className)}
    >
      {isVertical ? (
        <>
          {titleOnTop ? <div className="px-4 pt-4">{Title}</div> : null}
          {MediaVertical}
          <div className="px-4 pb-4">
            {!titleOnTop ? <div className="mt-1">{Title}</div> : null}
            {Desc}
            {Tags}
            <div className="mt-5 flex items-center justify-between">{Price}</div>
          </div>
        </>
      ) : (
        <>
          {MediaHorizontal}
          <div className="min-w-0 p-4">
            {titleOnTop ? Title : null}
            {Desc}
            {Tags}
            <div className="mt-5">{!titleOnTop ? Title : null}</div>
            <div className="mt-4 flex items-center justify-between">{Price}</div>
          </div>
        </>
      )}
    </SkeletonCard>
  );
}
