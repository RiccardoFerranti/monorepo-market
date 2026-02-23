import { isNumericId } from "./is-numeric-id";

describe("isNumericId", () => {
  it("should return true for valid numeric strings", () => {
    expect(isNumericId("0")).toBe(true);
    expect(isNumericId("123")).toBe(true);
    expect(isNumericId("0001")).toBe(true);
    expect(isNumericId("9876543210")).toBe(true);
  });

  it("should return false for strings containing letters", () => {
    expect(isNumericId("123a")).toBe(false);
    expect(isNumericId("a123")).toBe(false);
    expect(isNumericId("12b34")).toBe(false);
  });

  it("should return false for strings containing spaces", () => {
    expect(isNumericId(" 123")).toBe(false);
    expect(isNumericId("123 ")).toBe(false);
    expect(isNumericId("12 34")).toBe(false);
  });

  it("should return false for strings containing symbols", () => {
    expect(isNumericId("123-")).toBe(false);
    expect(isNumericId("123.45")).toBe(false);
    expect(isNumericId("+123")).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(isNumericId("")).toBe(false);
  });
});