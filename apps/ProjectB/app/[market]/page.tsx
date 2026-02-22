import Link from "next/link";
import { MARKETS, paths } from "@repo/constants";
import { Card } from "@repo/ui";
import { notFound } from "next/navigation";
import { TITLE } from "@/consts/brand";
import { TLocale } from "@repo/types";
import { isLocale } from "@/utils/is-locale";

type TWelcomePageProps = {
  params: Promise<{ market: TLocale }>;
};

export default async function WelcomePage({ params }: TWelcomePageProps) {
  const { market } = await params;

  if (!isLocale(market)) notFound();

  const copy = MARKETS[market];
  const welcomePage = MARKETS[market].pages.welcome;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-10">
      {/* Hero */}
      <section className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/70">
              {welcomePage.hero.marketLabel}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {copy.welcome} {TITLE}
            </h1>

            <p className="max-w-2xl text-base text-foreground/70">
              {welcomePage.hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={paths.products(market)}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              {welcomePage.hero.ctaPrimary}
            </Link>

            <Link
              href={paths.login(market)}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-muted/60 transition"
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
            <p className="text-sm font-semibold">
              {welcomePage.highlights.marketAwareTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {welcomePage.highlights.marketAwareDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">
              {welcomePage.highlights.brandConfigTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {welcomePage.highlights.brandConfigDesc}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <p className="text-sm font-semibold">
              {welcomePage.highlights.seoTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {welcomePage.highlights.seoDesc}
            </p>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
}
