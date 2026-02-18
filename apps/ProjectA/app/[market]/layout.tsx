// import { LOCALES, paths, BRANDS } from "@repo/constants";
// import type { TBrand, TLocale } from "@repo/types";
// import { Footer } from "@repo/ui/footer";
// import { Header } from "@repo/ui/header";
// import { notFound } from "next/navigation";
// import { MARKETS } from "@repo/constants";

// export function generateStaticParams() {
//   return LOCALES.map((market) => ({ market }));
// }

// export default async function MarketLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ market: string }>;
// }) {
//   const { market } = await params;

//   if (!LOCALES.includes(market as TLocale)) notFound();

//   const locale = market as TLocale;
//   const content = MARKETS[locale];

//   const brand: TBrand = "projectA";
//   const brandConfig = BRANDS[brand];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header
//         title="Project A"
//         navPosition={brandConfig.header.navPosition}
//         links={[
//           { label: content.nav.home, href: paths.home(locale) },
//           { label: content.nav.products, href: paths.products(locale) },
//           { label: content.nav.login, href: paths.login(locale) },
//         ]}
//       />

//       <main className="flex-1 mx-auto max-w-5xl px-6 py-8 w-full">
//         {children}
//       </main>

//       <Footer align={brandConfig.footer.align} className="bg-muted/40">
//         {brand} • /{locale}
//       </Footer>
//     </div>
//   );
// }
import { LOCALES, MARKETS, BRANDS, paths } from "@repo/constants";
import type { TBrand, TLocale } from "@repo/types";
import { notFound } from "next/navigation";
import { Header } from "@repo/ui/header";
import { Footer } from "@repo/ui/footer";

/**
 * Pre-generates all supported market routes at build time.
 *
 * Ensures `/en`, `/ca`, etc. are statically rendered,
 * improving performance and SEO by avoiding on-demand rendering.
 * @returns {Array<{market: string}>} An array of objects with market keys for each locale
 */
export function generateStaticParams() {
  return LOCALES.map((market) => ({ market }));
}

/**
 * Checks if a given string is a valid locale.
 *
 * @param {string} value - The string to check as a locale.
 * @returns {value is TLocale} True if the value is a valid TLocale, otherwise false.
 */
function isLocale(value: string): value is TLocale {
  return (LOCALES as readonly string[]).includes(value);
}

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  if (!isLocale(market)) notFound();

  const locale = market;
  const content = MARKETS[locale];

  const brand: TBrand = "projectA";
  const brandConfig = BRANDS[brand];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Project A"
        navPosition={brandConfig.header.navPosition}
        links={[
          { label: content.nav.home, href: paths.home(locale) },
          { label: content.nav.products, href: paths.products(locale) },
          { label: content.nav.login, href: paths.login(locale) },
        ]}
      />

      <main className="flex-1 mx-auto max-w-5xl px-6 py-8 w-full">
        {children}
      </main>

      <Footer align={brandConfig.footer.align} className="bg-muted/40">
        {brand} • /{locale}
      </Footer>
    </div>
  );
}
