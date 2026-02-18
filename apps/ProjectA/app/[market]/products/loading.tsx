import { GridSkeleton } from "@repo/ui/grid-skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      <GridSkeleton />
    </div>
  );
}
