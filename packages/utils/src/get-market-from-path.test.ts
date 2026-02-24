import { getMarketFromPath } from "./get-market-from-path";

describe("getMarketFromPath", () => {
  it("should return 'ca' when pathname starts with /ca", () => {
    expect(getMarketFromPath("/ca")).toBe("ca");
    expect(getMarketFromPath("/ca/")).toBe("ca");
    expect(getMarketFromPath("/ca/products")).toBe("ca");
    expect(getMarketFromPath("/ca/product/123")).toBe("ca");
  });

  it("should return 'en' when pathname starts with /en", () => {
    expect(getMarketFromPath("/en")).toBe("en");
    expect(getMarketFromPath("/en/")).toBe("en");
    expect(getMarketFromPath("/en/products")).toBe("en");
  });

  it("should default to 'en' for unknown or missing locale", () => {
    expect(getMarketFromPath("/")).toBe("en");
    expect(getMarketFromPath("")).toBe("en");
    expect(getMarketFromPath("/fr/products")).toBe("en");
    expect(getMarketFromPath("/something")).toBe("en");
  });
});
