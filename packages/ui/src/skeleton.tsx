// import clsx from "clsx";

// function Shimmer({ className }: { className?: string }) {
//   return (
//     <div
//       className={clsx(
//         "relative overflow-hidden rounded-lg",
//         // much lighter base than before
//         "bg-white/4 ring-1 ring-white/10",
//         // shimmer strip
//         "before:absolute before:inset-y-0 before:left-0 before:w-1/4",
//         "before:animate-[shimmer_1.6s_infinite]",
//         "before:bg-linear-to-r",
//         "before:from-transparent before:via-white/20 before:to-transparent",
//         "before:blur-md",
//         className,
//       )}
//     />
//   );
// }

// export function ProductTileSkeleton({ className }: { className?: string }) {
//   return (
//     <div
//       className={clsx(
//         "group rounded-2xl border border-border/60 bg-card shadow-sm",
//         "overflow-hidden",
//         className,
//       )}
//     >
//       {/* image area */}
//       <div className="p-3">
//         <Shimmer className="h-44 w-full rounded-xl" />
//       </div>

//       {/* text area */}
//       <div className="px-4 pb-4">
//         <Shimmer className="h-4 w-3/4 rounded-md" />
//         <div className="mt-3 space-y-2">
//           <Shimmer className="h-3 w-full rounded-md" />
//           <Shimmer className="h-3 w-5/6 rounded-md" />
//         </div>

//         <div className="mt-5 flex items-center justify-between">
//           <Shimmer className="h-4 w-16 rounded-md" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export function GridSkeleton({ count = 12 }: { count?: number }) {
//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {Array.from({ length: count }).map((_, i) => (
//         <ProductTileSkeleton key={i} />
//       ))}
//     </div>
//   );
// }

"use client";

import clsx from "clsx";

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg",
        // much lighter base than before
        "bg-white/4 ring-1 ring-white/10",
        // shimmer strip
        "before:absolute before:inset-y-0 before:left-0 before:w-1/4",
        "before:animate-[shimmer_1.6s_infinite]",
        "before:bg-linear-to-r",
        "before:from-transparent before:via-white/20 before:to-transparent",
        "before:blur-md",
        className,
      )}
    />
  );
}

export function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
