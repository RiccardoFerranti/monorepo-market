import type { TLocale } from "@repo/types"; 
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
  home: (locale: TLocale) => `/${locale}`,
  login: (locale: TLocale) => `/${locale}${ROUTES.LOGIN}`,
  products: (locale: TLocale) => `/${locale}${ROUTES.PRODUCTS}`,
  product: (locale: TLocale, slug: string) =>
    `/${locale}${ROUTES.PRODUCT}/${slug}`,
};
