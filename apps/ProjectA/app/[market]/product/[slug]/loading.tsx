import { SkeletonBlock } from "@repo/ui/skeleton-card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <SkeletonBlock className="h-4 w-32 rounded-md" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* image panel */}
        <div className="border-border/60 bg-card/70 rounded-2xl border p-4">
          <SkeletonBlock className="aspect-square w-full rounded-xl" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-14 w-14 rounded-lg" />
            ))}
          </div>
        </div>

        {/* info panel */}
        <div className="border-border/60 bg-card/70 rounded-2xl border p-6">
          <SkeletonBlock className="h-7 w-2/3 rounded-md" />
          <SkeletonBlock className="mt-3 h-4 w-full rounded-md" />
          <SkeletonBlock className="mt-2 h-4 w-5/6 rounded-md" />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-background/30 rounded-xl p-4">
                <SkeletonBlock className="h-3 w-20 rounded-md" />
                <SkeletonBlock className="mt-2 h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-7 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
