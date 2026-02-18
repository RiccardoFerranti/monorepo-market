import type { IProduct, TLocale } from "@repo/types";

import shuffleFirstN from "../../utils/shuffleFirstN";
import ProductTile from "../../components/product-tile";
import { LOCALES } from "@repo/constants";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

// export const dynamic = "force-static";
// export const revalidate = 30;

// async function getProducts(): Promise<IProduct[]> {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   const res = await fetch("https://dummyjson.com/products?limit=20", {
//     next: { revalidate },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data: { products: IProduct[] } = await res.json();
//   return data.products;
// }

async function getProducts(): Promise<IProduct[]> {
  "use cache";
  cacheLife("products30s"); // cache for 30 seconds

  console.log("[products] fetch executed at:", new Date().toISOString());

  const res = await fetch("https://dummyjson.com/products?limit=20");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: IProduct[] } = await res.json();
  return data.products;
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  if (!LOCALES.includes(market as TLocale)) {
    notFound();
  }

  const products = await getProducts();
  const shuffledProducts = shuffleFirstN(products);

  console.groupCollapsed(
    `%c[Products ISR] Regenerated`,
    "color: #22c55e; font-weight: 600;",
  );

  console.log("Time:", new Date().toISOString());
  console.log(
    "First 10 IDs:",
    shuffledProducts.slice(0, 10).map((p) => p.id),
  );
  console.log("Total products:", shuffledProducts.length);

  console.groupEnd();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="mt-1 text-sm text-foreground/70">
              Updated every 5 minutes (ISR + shuffle).
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shuffledProducts.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
