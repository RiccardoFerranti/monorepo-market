"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MARKETS, paths } from "@repo/constants";
import { Button } from "@repo/ui";
import { getMarketFromPath } from "@repo/utils";

export default function ProductNotFound() {
  const pathname = usePathname();
  const market = getMarketFromPath(pathname);

  const content = MARKETS[market];
  const productNotFoundPage = content.pages.product.notFound;

  return (
    <div className="mx-auto max-w-3xl space-y-3 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{productNotFoundPage.title}</h1>

      <p className="text-foreground/70 text-sm">{productNotFoundPage.description}</p>

      <Link href={paths.products(market)} className="inline-block">
        <Button variant="outline">{content.pages.product.backToProducts}</Button>
      </Link>
    </div>
  );
}
