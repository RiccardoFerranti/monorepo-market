import { Suspense } from "react";
import { LOCALES, MARKETS, BRANDS, paths } from "@repo/constants";
import type { TLocale } from "@repo/types";
import { isLocale } from "@repo/utils";
import { notFound } from "next/navigation";
import { Footer, Header, THeaderLink, THeaderProps } from "@repo/ui";
import { BRAND, TITLE } from "@/consts/brand";
import HeaderAuth from "@/components/header-auth";

/**
 * Pre-generates all supported market routes at build time.
 *
 * Ensures `/en`, `/ca`, etc. are statically rendered,
 * improving performance and SEO by avoiding on-demand rendering.
 * @returns {Array<{market: TLocale}>} An array of objects with market keys for each locale
 */
export function generateStaticParams() {
  return LOCALES.map((market) => ({ market }));
}

type TMarketLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ market: TLocale }>;
};

export default async function MarketLayout({
  children,
  params,
}: TMarketLayoutProps) {
  const { market } = await params;
  if (!isLocale(market)) notFound();

  const locale = market;
  const content = MARKETS[locale];
  const brandConfig = BRANDS[BRAND];

  const links: THeaderLink[] = [
    { key: "home", label: content.nav.home, href: paths.home(locale) },
    {
      key: "products",
      label: content.nav.products,
      href: paths.products(locale),
    },
  ];

  const headerProps: Omit<THeaderProps, "activeKey"> = {
    title: TITLE,
    navPosition: brandConfig.header.navPosition,
    links,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<Header {...headerProps} />}>
        <HeaderAuth
          {...headerProps}
          locale={locale}
          loginLabel={content.nav.login}
          logoutLabel={content.nav.logout}
        />
      </Suspense>

      <main className="flex-1 mx-auto max-w-6xl px-6 py-8 w-full">
        {children}
      </main>

      <Footer align={brandConfig.footer.align}>
        {BRAND} • /{locale}
      </Footer>
    </div>
  );
}
