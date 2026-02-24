export const BRAND_KEYS = ["projectA", "projectB"] as const;
export type TBrand = (typeof BRAND_KEYS)[number];
