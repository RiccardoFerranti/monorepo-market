import Link from "next/link";
import { MARKETS, paths } from "@repo/constants";
import { Card } from "@repo/ui";
import { notFound } from "next/navigation";
import { isLocale } from "@repo/utils";
import type { TLocale } from "@repo/types";
import { TITLE } from "@/consts/brand";

type TWelcomePageProps = {
  params: Promise<{ market: TLocale }>;
};

export default async function WelcomePage({ params }: TWelcomePageProps) {
  const { market } = await params;

  if (!isLocale(market)) notFound();

  const copy = MARKETS[market];
  const welcomePage = MARKETS[market].pages.welcome;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      {/* Hero */}
      <section className="border-border bg-card rounded-2xl border p-8 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-foreground/70 text-sm font-medium">{welcomePage.hero.marketLabel}</p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {copy.welcome} {TITLE}
            </h1>

            <p className="text-foreground/70 max-w-2xl text-base">{welcomePage.hero.description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={paths.products(market)}
              className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition hover:opacity-90"
            >
              {welcomePage.hero.ctaPrimary}
            </Link>

            <Link
              href={paths.login(market)}
              className="border-border bg-background hover:bg-muted/60 inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-medium transition"
            >
              {welcomePage.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">{welcomePage.highlights.marketAwareTitle}</p>
            <p className="text-foreground/70 mt-2 text-sm">
              {welcomePage.highlights.marketAwareDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">{welcomePage.highlights.brandConfigTitle}</p>
            <p className="text-foreground/70 mt-2 text-sm">
              {welcomePage.highlights.brandConfigDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">{welcomePage.highlights.seoTitle}</p>
            <p className="text-foreground/70 mt-2 text-sm">{welcomePage.highlights.seoDesc}</p>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
}
