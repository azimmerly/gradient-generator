import { pickRandom } from "./pickRandom";

describe("pickRandom", () => {
  it("returns a random element from the array", () => {
    const arr = [1, 2, 3, 4, 5] as const;
    expect(arr).toContain(pickRandom(arr));
  });

  it("returns different elements across multiple calls", () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const results = new Set(Array.from({ length: 10 }, () => pickRandom(arr)));
    expect(results.size).toBeGreaterThan(1);
  });

  it("always returns the only element in a single-item array", () => {
    expect(pickRandom(["only"])).toBe("only");
  });
});
