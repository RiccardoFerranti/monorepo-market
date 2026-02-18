import type { IProduct } from "@repo/types";
import shuffleFirstN from "../../utils/shuffleFirstN";
import ProductTile from "../../components/product-tile";
import { cacheLife } from "next/cache";

async function getProducts(): Promise<IProduct[]> {
  "use cache";
  cacheLife("products30s");

  console.log("[products] fetch executed at:", new Date().toISOString());

  const res = await fetch("https://dummyjson.com/products?limit=20");
  if (!res.ok) throw new Error("Failed to fetch products");

  const data: { products: IProduct[] } = await res.json();
  return data.products;
}

export default async function ProductsGrid() {
  const products = await getProducts();

  const windowSeed = Math.floor(Date.now() / 300_000); // changes every 5m
  const shuffledProducts = shuffleFirstN(products, 10, windowSeed);

  console.groupCollapsed(
    `%c[Products] Render`,
    "color:#22c55e;font-weight:600;",
  );
  console.log("Time:", new Date().toISOString());
  console.log(
    "First 10 IDs:",
    shuffledProducts.slice(0, 10).map((p) => p.id),
  );
  console.log("Total:", shuffledProducts.length);
  console.groupEnd();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shuffledProducts.map((p) => (
        <ProductTile key={p.id} product={p} />
      ))}
    </div>
  );
}
