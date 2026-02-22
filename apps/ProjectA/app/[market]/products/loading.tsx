import { BRANDS } from "@repo/constants";
import { BRAND } from "@/consts/brand";
import { SkeletonBlock } from "@repo/ui";
import ProductsGridSkeleton from "./components/products-grid-skeleton";

export default function Loading() {
  const config = BRANDS[BRAND].productCard;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 space-y-2">
        <SkeletonBlock className="h-7 w-40 rounded-md" />
      </div>

      {/* Grid skeleton */}
      <ProductsGridSkeleton config={config} />
    </div>
  );
}
