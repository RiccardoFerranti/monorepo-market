import { IProductCardConfig } from "@repo/types";
import ProductsGridSkeleton from "./products-grid-skeleton";

type TProductsGridFallbackProps = {
  config: IProductCardConfig;
};

export function ProductsGridFallback({ config }: TProductsGridFallbackProps) {
  return <ProductsGridSkeleton config={config} />;
}
