import { TLocale } from "@repo/types";

/**
 * Determines the market locale from the given pathname.
 *
 * @param {string} pathname - The URL pathname (e.g., "/en/product/123").
 * @returns {TLocale} The locale segment ("en" or "ca").
 */
export function getMarketFromPath(pathname: string): TLocale {
  const seg = pathname.split("/")[1];
  return seg === "ca" ? "ca" : "en";
}
