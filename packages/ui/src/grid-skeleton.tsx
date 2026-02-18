import clsx from "clsx";

export function GridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
          relative overflow-hidden rounded-2xl border border-border bg-muted/20
          before:absolute before:inset-0
          before:-translate-x-[140%]
          before:bg-linear-to-tr before:from-transparent before:via-foreground/10 before:to-transparent
          before:skew-x-[-20deg]
          before:animate-[shimmer_1.8s_infinite]
        "
        >
          <div className="p-4 space-y-4">
            <div className="h-40 w-full rounded-xl bg-muted/40" />
            <div className="h-4 w-2/3 rounded bg-muted/40" />
            <div className="h-4 w-1/3 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
