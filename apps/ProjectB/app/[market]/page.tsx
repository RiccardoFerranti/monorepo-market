import Link from "next/link";
import { MARKETS, paths } from "@repo/constants";
import type { TLocale } from "@repo/types";
import { Card } from "@repo/ui";

type TMarketPageProps = {
  params: Promise<{ market: string }>;
};

export default async function MarketPage({ params }: TMarketPageProps) {
  const { market } = await params;
  const locale = market as TLocale;

  const copy = MARKETS[locale];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-10">
      {/* Hero */}
      <section className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/70">
              {copy.hero.marketLabel}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {copy.welcome} Project B
            </h1>

            <p className="max-w-2xl text-base text-foreground/70">
              {copy.hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={paths.products(locale)}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              {copy.hero.ctaPrimary}
            </Link>

            <Link
              href={paths.login(locale)}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-muted/60 transition"
            >
              {copy.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">
              {copy.highlights.marketAwareTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {copy.highlights.marketAwareDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">
              {copy.highlights.brandConfigTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {copy.highlights.brandConfigDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">{copy.highlights.seoTitle}</p>
            <p className="mt-2 text-sm text-foreground/70">
              {copy.highlights.seoDesc}
            </p>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
}
