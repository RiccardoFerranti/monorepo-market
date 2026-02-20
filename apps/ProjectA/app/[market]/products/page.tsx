import { Suspense } from "react";
import type { TLocale } from "@repo/types";
import { BRANDS, LOCALES } from "@repo/constants";
import { notFound } from "next/navigation";
import { ProductsGridFallback } from "./components/products-grid-fallback";
import ProductsGrid from "./components/products-grid";
import { BRAND } from "@/app/consts/brand";

type TProductsPageProps = {
  params: Promise<{ market: string }>;
};

export default async function ProductsPage({ params }: TProductsPageProps) {
  const { market } = await params;
  await new Promise((r) => setTimeout(r, 3000));
  const config = BRANDS[BRAND].productCard;

  if (!LOCALES.includes(market as TLocale)) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          </div>
        </div>

        <Suspense fallback={<ProductsGridFallback config={config} />}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
