import { SkeletonBlock, SkeletonCard } from "@repo/ui/skeleton";

export function ProductTileSkeleton() {
  return (
    <SkeletonCard>
      <div className="p-3">
        <SkeletonBlock className="h-44 w-full rounded-xl" />
      </div>

      <div className="px-4 pb-4">
        <SkeletonBlock className="h-4 w-3/4 rounded-md" />
        <div className="mt-3 space-y-2">
          <SkeletonBlock className="h-3 w-full rounded-md" />
          <SkeletonBlock className="h-3 w-5/6 rounded-md" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <SkeletonBlock className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </SkeletonCard>
  );
}
