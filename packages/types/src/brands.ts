import { LOCALES, BRANDS } from "@repo/constants";

// Brands type from constants
export type TBrand = keyof typeof BRANDS;

// Locale type from constants
export type TLocale = (typeof LOCALES)[number];
