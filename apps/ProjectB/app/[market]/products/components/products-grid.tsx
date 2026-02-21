import { cacheLife } from "next/cache";
import Link from "next/link";
import type { IProductRecord, TLocale } from "@repo/types";
import { BRANDS, paths, PRODUCTS_REVALIDATE_MS } from "@repo/constants";
import { ProductCard } from "@repo/ui";
import shuffleFirstN from "@/app/utils/shuffleFirstN";
import { logGroup } from "@/app/utils/serverLogger";
import { BRAND } from "@/app/consts/brand";

/**
 * Fetches products from the external API and generates a deterministic seed for shuffling based on cache lifetime.
 * Uses cache for 5 minutes, corresponding to PRODUCTS_REVALIDATE_MS.
 *
 * @returns {Promise<{ products: IProduct[]; seed: number }>} An object containing the products array and a shuffle seed.
 * @throws {Error} If the product fetch fails.
 */
async function getProductsCached(): Promise<{
  products: IProductRecord[];
  seed: number;
  generatedAt: string;
}> {
  "use cache";
  cacheLife("products30s");
  // await new Promise((r) => setTimeout(r, 3000));
  const res = await fetch("https://dummyjson.com/products?limit=20");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: { products: IProductRecord[] } = await res.json();

  /**
   * We generate the timestamp INSIDE the cached function
   * so that:
   *
   * - products, seed and generatedAt are frozen together for the entire cache window (5 minutes).
   * - the shuffle remains stable during the cache lifetime.
   * - we avoid Next.js prerender errors related to accessing Date.now() outside cached/request scope.
   *
   * This guarantees deterministic output per cache window.
   */
  const now = Date.now();

  return {
    products: data.products,
    seed: Math.floor(now / PRODUCTS_REVALIDATE_MS),
    generatedAt: new Date(now).toISOString(),
  };
}

type TProductsGridProps = {
  market: string;
};

export default async function ProductsGrid({ market }: TProductsGridProps) {
  const { products, seed, generatedAt } = await getProductsCached();
  console.log(products);
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
