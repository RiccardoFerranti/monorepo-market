export const LOCALES = ["en", "ca"] as const;
export type TLocale = (typeof LOCALES)[number];
