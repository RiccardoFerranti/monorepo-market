"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKETS, paths } from "@repo/constants";
import { Button } from "@repo/ui";
import type { TLocale } from "@repo/types";

function getMarketFromPath(pathname: string): TLocale {
  const seg = pathname.split("/")[1];
  return seg === "ca" ? "ca" : "en";
}

export default function ProductNotFound() {
  const pathname = usePathname();
  const market = getMarketFromPath(pathname);

  const content = MARKETS[market];
  const productNotFoundPage = content.pages.product.notFound;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">
        {productNotFoundPage.title}
      </h1>

      <p className="text-sm text-foreground/70">
        {productNotFoundPage.description}
      </p>

      <Link href={paths.products(market)} className="inline-block">
        <Button variant="outline">
          {content.pages.product.backToProducts}
        </Button>
      </Link>
    </div>
  );
}
