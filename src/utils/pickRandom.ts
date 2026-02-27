export const pickRandom = <T>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
