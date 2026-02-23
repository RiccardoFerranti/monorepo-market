/**
 * Shuffle the first N items of an array in a deterministic way.
 *
 * Why not Math.random()?
 * - Math.random() is non-deterministic (changes every render/request).
 * - With Next caching/ISR, deterministic output per cache window is easier to reason about and demo.
 *
 * @param items Input items (not mutated)
 * @param n How many items from the start to shuffle (default 10)
 * @param seed Seed to make the shuffle repeatable (default 1)
 * @returns {T[]} A new array where:
 * - The first `n` elements are shuffled deterministically.
 * - The remaining elements keep their original order.
 * - The original `items` array is NOT modified.
 */
export function shuffleFirstN<T>(
  items: readonly T[],
  n = 10,
  seed = 1,
): T[] {
  // Split into "head" (shuffled) and "tail" (kept as-is)
  const head = items.slice(0, n) as T[];
  const tail = items.slice(n) as T[];

  /**
   * Simple seeded PRNG: LCG (Linear Congruential Generator)
   * - constants are standard 32-bit LCG parameters
   * - >>> 0 keeps values in unsigned 32-bit range
   */
  let x = seed >>> 0;
  const rand = () => {
    x = (x * 1664525 + 1013904223) >>> 0; // update seed
    return x / 4294967296; // float in [0, 1)
  };

  /**
   * Fisher–Yates shuffle (in-place) on head only
   */
  for (let i = head.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));

    // swap head[i] and head[j]
    const tmp = head[i]!;
    head[i] = head[j]!;
    head[j] = tmp;
  }

  return head.concat(tail);
}