import { LOCALES, paths, BRANDS } from "@repo/constants";
import type { TBrand, TLocale } from "@repo/types";
import { Footer } from "@repo/ui/footer";
import { Header } from "@repo/ui/header";
import { notFound } from "next/navigation";
import { MARKETS } from "@repo/constants";

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  if (!LOCALES.includes(market as TLocale)) notFound();

  const locale = market as TLocale;
  const content = MARKETS[locale];

  const brand: TBrand = "projectB";
  const brandConfig = BRANDS[brand];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Project B"
        navPosition={brandConfig.header.navPosition}
        links={[
          { label: content.nav.home, href: paths.home(locale) },
          { label: content.nav.products, href: paths.products(locale) },
          { label: content.nav.login, href: paths.login(locale) },
        ]}
      />

      <main className="flex-1 mx-auto max-w-6xl px-6 py-8 w-full">
        {children}
      </main>

      <Footer align={brandConfig.footer.align}>
        {brand} • /{locale}
      </Footer>
    </div>
  );
}
