export const LOCALES = ["en", "ca"] as const;
// extract any element from the array as a type (["en", "ca"] -> "en" | "ca")
export type TLocale = (typeof LOCALES)[number];
