import { LOCALES } from "@repo/constants";
import { TLocale } from "@repo/types";

export function isLocale(value: string): value is TLocale {
  return (LOCALES as readonly string[]).includes(value);
}
