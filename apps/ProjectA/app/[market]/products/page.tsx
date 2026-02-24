import { Suspense } from "react";
import type { TLocale } from "@repo/types";
import { BRANDS, LOCALES, MARKETS } from "@repo/constants";
import { notFound } from "next/navigation";
import { isLocale } from "@repo/utils";
import { BRAND } from "@/consts/brand";
import { ProductsGridFallback } from "./components/products-grid-fallback";
import ProductsGrid from "./components/products-grid";

type TProductsPageProps = {
  params: Promise<{ market: TLocale }>;
};

export default async function ProductsPage({ params }: TProductsPageProps) {
  const { market } = await params;

  if (!isLocale(market)) notFound();

  const config = BRANDS[BRAND].productCard;

  if (!LOCALES.includes(market as TLocale)) notFound();

  const productsPage = MARKETS[market].pages.products;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{productsPage.title}</h1>
        </div>
      </div>

      <Suspense fallback={<ProductsGridFallback config={config} />}>
        <ProductsGrid market={market} />
      </Suspense>
    </div>
  );
}
