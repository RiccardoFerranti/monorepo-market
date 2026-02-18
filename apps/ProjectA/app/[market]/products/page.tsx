import { Suspense } from "react";
import type { TLocale } from "@repo/types";
import { LOCALES } from "@repo/constants";
import { notFound } from "next/navigation";
import ProductsGrid from "./products-grid";
import { GridSkeleton } from "@repo/ui/grid-skeleton";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  if (!LOCALES.includes(market as TLocale)) notFound();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="mt-1 text-sm text-foreground/70">
              Updated every 30 seconds (ISR + shuffle).
            </p>
          </div>
        </div>

        <Suspense fallback={<GridSkeleton />}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
