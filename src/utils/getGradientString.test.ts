import { getGradientString } from "./getGradientString";

const mockStops = [
  { id: "1", color: "#aaa", position: 0 },
  { id: "2", color: "#bbb", position: 50 },
  { id: "3", color: "#ccc", position: 100 },
];

describe("getGradientString", () => {
  it("returns empty string for no stops", () => {
    expect(
      getGradientString({
        type: "linear",
        directionAngle: 90,
        radialPosition: "center",
        stops: [],
      }),
    ).toBe("");
  });

  it("generates a linear gradient string", () => {
    expect(
      getGradientString({
        type: "linear",
        directionAngle: 90,
        radialPosition: "center",
        stops: mockStops,
      }),
    ).toBe("linear-gradient(90deg, #aaa 0%, #bbb 50%, #ccc 100%)");
  });

  it("generates a radial gradient string", () => {
    expect(
      getGradientString({
        type: "radial",
        directionAngle: 90,
        radialPosition: "center",
        stops: mockStops,
      }),
    ).toBe("radial-gradient(circle at center, #aaa 0%, #bbb 50%, #ccc 100%)");
  });
});
