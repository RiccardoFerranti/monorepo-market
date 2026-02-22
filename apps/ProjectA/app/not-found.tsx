"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKETS, paths } from "@repo/constants";
import { Button } from "@repo/ui";
import { getMarketFromPath } from "@/utils/get-market-from-path";

export default function NotFound() {
  const pathname = usePathname();
  const market = getMarketFromPath(pathname);

  const content = MARKETS[market];
  const copy = content.pages.notFound;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
      <p className="text-sm text-foreground/70">{copy.description}</p>

      <Link href={paths.home(market)} className="inline-block">
        <Button variant="outline">{copy.backHome}</Button>
      </Link>
    </div>
  );
}
