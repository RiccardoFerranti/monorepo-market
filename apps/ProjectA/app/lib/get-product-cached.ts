import { IProductRecord } from "@repo/types";
import { cacheLife } from "next/cache";

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
