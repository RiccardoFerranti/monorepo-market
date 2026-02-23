import { PRODUCTS_REVALIDATE_MS } from "@repo/constants";
import { IProductRecord } from "@repo/types";
import { cacheLife } from "next/cache";

/**
 * Fetches products from the external API and generates a deterministic seed for shuffling based on cache lifetime.
 * Uses cache for 5 minutes, corresponding to PRODUCTS_REVALIDATE_MS.
 *
 * @returns {Promise<{ products: IProduct[]; seed: number }>} An object containing the products array and a shuffle seed.
 * @throws {Error} If the product fetch fails.
 */
export async function getProductsCached(): Promise<{
  products: IProductRecord[];
  seed: number;
  generatedAt: string;
}> {
  "use cache";
  cacheLife("products5m");
  // await new Promise((r) => setTimeout(r, 3000));

  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products?limit=20`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: { products: IProductRecord[] } = await res.json();

  /**
   * The timestamp is generated inside the cached function
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
