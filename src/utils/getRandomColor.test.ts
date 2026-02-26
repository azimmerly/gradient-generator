import { getRandomColor } from "./getRandomColor";

describe("getRandomColor", () => {
  it("returns a valid hex color string", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("returns different colors across multiple calls", () => {
    const colors = new Set(Array.from({ length: 10 }, getRandomColor));
    expect(colors.size).toBeGreaterThan(1);
  });
});
