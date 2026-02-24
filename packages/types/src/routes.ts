import { TLocale } from "./markets";

// Routes per market
export type Routes = {
  home: (locale: TLocale) => string;
  login: (locale: TLocale) => string;
  products: (locale: TLocale) => string;
  product: (locale: TLocale, slug: string) => string;
};
