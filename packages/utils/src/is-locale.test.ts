import { isLocale } from "./is-locale";
import { LOCALES } from "@repo/constants";

describe("isLocale", () => {
  it("should return true for all valid locales", () => {
    LOCALES.forEach((locale) => {
      expect(isLocale(locale)).toBe(true);
    });
  });

  it("should return false for invalid values", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("EN")).toBe(false); // case-sensitive
  });
});
