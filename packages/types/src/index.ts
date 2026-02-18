import { BRANDS, LOCALES } from "@repo/constants";

// Brand type from constants
export type Brand = (typeof BRANDS)[number];

// Locale type from constants
export type Locale = (typeof LOCALES)[number];

// Routes per market
export type Routes = {
  home: (locale: Locale) => string;
  login: (locale: Locale) => string;
  products: (locale: Locale) => string;
  product: (locale: Locale, slug: string) => string;
};
