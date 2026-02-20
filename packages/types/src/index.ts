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

export interface IProductRecordReview {
  rating: number;
  comment: string;
  date: string; // ISO string
  reviewerName: string;
  reviewerEmail: string;
}
export interface IProductRecord {
  id: number;

  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;

  tags: string[];

  brand: string;
  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: {
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    barcode: string;
    qrCode: string; // URL
  };

  images: string[]; // URLs
  thumbnail: string; // URL

  reviews: IProductRecord[];
}

export interface IProductCardConfig {
  layout: "vertical" | "horizontal";
  titlePlacement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  contentAlign?: "left" | "right" | "center";
  showCategories: boolean;
  thumbnails: 0 | 1 | 2; // number of thumbnails to show from images[]
}
