import { Suspense } from "react";

import { notFound } from "next/navigation";

import { LOCALES, MARKETS, BRANDS, paths } from "@repo/constants";
import { Footer, Header, type THeaderLink, type THeaderProps } from "@repo/ui";
import { isLocale } from "@repo/utils";


import HeaderAuth from "@/components/header-auth";

import { BRAND, TITLE } from "../../consts/brand";


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
  params: Promise<{ market: string }>;
};

export default async function MarketLayout({ children, params }: TMarketLayoutProps) {
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
    titleHref: paths.home(locale),
    navPosition: brandConfig.header.navPosition,
    links,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<Header {...headerProps} />}>
        <HeaderAuth
          {...headerProps}
          locale={locale}
          loginLabel={content.nav.login}
          logoutLabel={content.nav.logout}
        />
      </Suspense>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>

      <Footer align={brandConfig.footer.align}>
        {BRAND} • /{locale}
      </Footer>
    </div>
  );
}
