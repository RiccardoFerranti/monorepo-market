import { cacheLife } from "next/cache";
import type { IProduct } from "@repo/types";
import { PRODUCTS_REVALIDATE_MS } from "@repo/constants";
import shuffleFirstN from "../../utils/shuffleFirstN";
import ProductTile from "../../components/product-tile";
import { logGroup } from "../../utils/serverLogger";

/**
 * Fetches products from the external API and generates a deterministic seed for shuffling based on cache lifetime.
 * Uses cache for 5 minutes, corresponding to PRODUCTS_REVALIDATE_MS.
 *
 * @returns {Promise<{ products: IProduct[]; seed: number }>} An object containing the products array and a shuffle seed.
 * @throws {Error} If the product fetch fails.
 */
async function getProductsCached(): Promise<{
  products: IProduct[];
  seed: number;
  generatedAt: string;
}> {
  "use cache";
  cacheLife("products30s");

  const res = await fetch("https://dummyjson.com/products?limit=20");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: { products: IProduct[] } = await res.json();

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

export default async function ProductsGrid() {
  const { products, seed, generatedAt } = await getProductsCached();
  const shuffledProducts = shuffleFirstN(products, 10, seed);

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
    <>
      {shuffledProducts.map((p) => (
        <ProductTile key={p.id} product={p} />
      ))}
    </>
  );
}
