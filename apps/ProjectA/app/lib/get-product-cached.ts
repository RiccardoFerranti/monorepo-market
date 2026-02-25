import { cacheLife } from "next/cache";

import type { IProductRecord } from "@repo/types";

/**
 * Fetches a single product by its ID from the external API and caches the result for 5 minutes.
 *
 * @param {string} id - The unique identifier of the product to fetch.
 * @returns {Promise<IProductRecord>} A promise that resolves to the fetched product record.
 * @throws {Error} If the API base URL is not defined or the fetch fails.
 */
export async function getProductCached(id: string): Promise<IProductRecord> {
  "use cache";
  cacheLife("product5m");

  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
