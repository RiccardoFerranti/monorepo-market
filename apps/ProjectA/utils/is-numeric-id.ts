/**
 * Checks if a given string contains only numeric digits (0-9).
 *
 * @param {string} value - The string to test.
 * @returns {boolean} True if the string consists only of numeric digits, false otherwise.
 */
export function isNumericId(value: string): boolean {
  return /^[0-9]+$/.test(value);
}
