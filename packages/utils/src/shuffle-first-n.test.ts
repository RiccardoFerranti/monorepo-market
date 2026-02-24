import { shuffleFirstN } from "./shuffle-first-n";

describe("shuffleFirstN", () => {
  const items = [1, 2, 3, 4, 5, 6, 7];

  it("should not mutate original array", () => {
    const copy = [...items];
    shuffleFirstN(items, 5, 1);
    expect(items).toEqual(copy);
  });

  it("should keep items after N in original order", () => {
    const result = shuffleFirstN(items, 3, 1);

    // items after index 3 should remain unchanged
    expect(result.slice(3)).toEqual(items.slice(3));
  });

  it("should shuffle only first N items", () => {
    const result = shuffleFirstN(items, 3, 1);

    // First 3 should contain same elements but possibly different order
    expect(result.slice(0, 3).sort()).toEqual([1, 2, 3]);
  });

  it("should be deterministic with same seed", () => {
    const r1 = shuffleFirstN(items, 5, 42);
    const r2 = shuffleFirstN(items, 5, 42);

    expect(r1).toEqual(r2);
  });

  it("should produce different result with different seed", () => {
    const r1 = shuffleFirstN(items, 5, 1);
    const r2 = shuffleFirstN(items, 5, 2);

    expect(r1).not.toEqual(r2);
  });

  it("should handle n greater than array length", () => {
    const result = shuffleFirstN(items, 100, 1);

    // Entire array shuffled
    expect(result.sort()).toEqual([...items].sort());
  });

  it("should handle empty array", () => {
    const result = shuffleFirstN([], 5, 1);
    expect(result).toEqual([]);
  });
});
