import { LOCALES } from "@repo/constants";
import { TLocale } from "@repo/types";

/**
 * Checks if the given string is a valid locale defined in LOCALES.
 *
 * @param {string} value - The string to check as a locale.
 * @returns {value is TLocale} True if the value is a valid locale, false otherwise.
 */
export function isLocale(value: string): value is TLocale {
  return (LOCALES as readonly string[]).includes(value);
}
