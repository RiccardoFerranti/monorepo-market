import { LOCALES } from "@repo/constants";
import type { TLocale } from "@repo/types";

/**
 * Checks if the given value is a valid locale.
 *
 * @param {string} value - The value to check.
 * @returns {value is TLocale} True if the value is a valid TLocale locale, otherwise false and return type is string
 */
export function isLocale(value: string): value is TLocale {
  return (LOCALES as readonly string[]).includes(value);
}
