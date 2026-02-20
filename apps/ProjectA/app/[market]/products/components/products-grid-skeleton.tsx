import { IProductCardConfig } from "@repo/types";
import { ProductCardSkeleton } from "@repo/ui/product-card-skeleton";

type TProductsGridSkeletonProps = {
  config: IProductCardConfig;
};

export default function ProductsGridSkeleton({
  config,
}: TProductsGridSkeletonProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} config={config} />
      ))}
    </div>
  );
}
