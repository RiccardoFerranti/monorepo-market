import { LOCALES, BRANDS } from "@repo/constants";

// Brands type from constants
export type TBrand = keyof typeof BRANDS;

// Locale type from constants
export type TLocale = (typeof LOCALES)[number];

// Routes per market
export type Routes = {
  home: (locale: TLocale) => string;
  login: (locale: TLocale) => string;
  products: (locale: TLocale) => string;
  product: (locale: TLocale, slug: string) => string;
};

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  category?: string;
}