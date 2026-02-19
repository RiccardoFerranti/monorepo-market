import { ProductTileSkeleton } from "../../components/product-tile-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductTileSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
