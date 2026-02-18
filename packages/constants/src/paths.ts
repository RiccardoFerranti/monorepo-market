import type { Locale } from "@repo/types";
import { ROUTES } from "./routes";

/**
 * Utility functions for generating locale-aware paths based on route constants.
 *
 * @module paths
 * @example
 * import { paths } from './paths';
 * paths.home("en"); // "/en"
 * paths.productDetail("ca", "product-slug"); // "/ca/product/product-slug"
 */

export const paths = {
  home: (locale: Locale) => `/${locale}`,
  login: (locale: Locale) => `/${locale}${ROUTES.LOGIN}`,
  products: (locale: Locale) => `/${locale}${ROUTES.PRODUCTS}`,
  productDetail: (locale: Locale, slug: string) =>
    `/${locale}${ROUTES.PRODUCT_DETAIL}/${slug}`,
};
