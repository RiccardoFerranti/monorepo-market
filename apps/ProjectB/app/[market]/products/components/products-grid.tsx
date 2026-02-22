import Link from "next/link";
import type { TLocale } from "@repo/types";
import { BRANDS, paths } from "@repo/constants";
import { ProductCard } from "@repo/ui";
import shuffleFirstN from "@/utils/shuffle-first-n";
import { logGroup } from "@/utils/server-logger";
import { BRAND } from "@/consts/brand";
import { getProductsCached } from "@/app/lib/get-products-cached";

type TProductsGridProps = {
  market: TLocale;
};

export default async function ProductsGrid({ market }: TProductsGridProps) {
  const { products, seed, generatedAt } = await getProductsCached();

  const shuffledProducts = shuffleFirstN(products, 10, seed);

  const config = BRANDS[BRAND].productCard;

  logGroup({
    title: "[Products] Render",
    data: {
      GeneratedAt: generatedAt,
      See: seed,
      "First 10 IDs": shuffledProducts.slice(0, 10).map((p) => p.id),
      Total: shuffledProducts.length,
    },
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shuffledProducts.map((p) => (
        <Link key={p.id} href={paths.product(market as TLocale, String(p.id))}>
          <ProductCard product={p} config={config} />
        </Link>
      ))}
    </div>
  );
}
