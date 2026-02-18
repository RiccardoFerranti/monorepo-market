// export default function shuffleFirstN<T>(items: readonly T[], count = 10): T[] {
//   const n = Math.min(count, items.length);
//   const head = items.slice(0, n).slice();

//   for (let i = head.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));

//     const tmp = head[i]!;
//     head[i] = head[j]!;
//     head[j] = tmp;
//   }

//   return [...head, ...items.slice(n)];
// }

export default function shuffleFirstN<T>(
  items: readonly T[],
  n = 10,
  seed = 1,
): T[] {
  const head = items.slice(0, n) as T[];
  const tail = items.slice(n) as T[];

  let x = seed >>> 0;
  const rand = () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 4294967296;
  };

  for (let i = head.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = head[i]!;
    head[i] = head[j]!;
    head[j] = tmp;
  }

  return head.concat(tail);
}