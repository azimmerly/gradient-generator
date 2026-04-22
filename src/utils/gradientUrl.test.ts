import type { GradientState } from "@/types";
import { parseGradientUrl, serializeGradient } from "./gradientUrl";

const linearState: GradientState = {
  type: "linear",
  directionAngle: 135,
  radialPosition: "center",
  stops: [
    { id: "1", color: "#2fb1bf", position: 0 },
    { id: "2", color: "#eafbca", position: 40 },
    { id: "3", color: "#6082f8", position: 80 },
  ],
};

const radialState: GradientState = {
  type: "radial",
  directionAngle: 135,
  radialPosition: "top left",
  stops: [
    { id: "1", color: "#ff0000", position: 0 },
    { id: "2", color: "#0000ff", position: 100 },
  ],
};

describe("serializeGradient", () => {
  it("serializes a linear gradient", () => {
    expect(serializeGradient(linearState)).toBe(
      "?type=linear&angle=135&stops=2fb1bf%3A0%2Ceafbca%3A40%2C6082f8%3A80",
    );
  });

  it("serializes a radial gradient", () => {
    const result = serializeGradient(radialState);
    const params = new URLSearchParams(result.slice(1));
    expect(params.get("type")).toBe("radial");
    expect(params.get("pos")).toBe("top left");
    expect(params.get("angle")).toBeNull();
    expect(params.get("stops")).toBe("ff0000:0,0000ff:100");
  });

  it("omits angle for radial and pos for linear", () => {
    const linearParams = new URLSearchParams(
      serializeGradient(linearState).slice(1),
    );
    expect(linearParams.get("pos")).toBeNull();
    expect(linearParams.get("angle")).toBe("135");

    const radialParams = new URLSearchParams(
      serializeGradient(radialState).slice(1),
    );
    expect(radialParams.get("angle")).toBeNull();
    expect(radialParams.get("pos")).toBe("top left");
  });
});

describe("parseGradientUrl", () => {
  it("parses a linear gradient", () => {
    const result = parseGradientUrl(serializeGradient(linearState));
    expect(result).not.toBeNull();
    expect(result!.type).toBe("linear");
    expect(result!.directionAngle).toBe(135);
    expect(result!.stops).toHaveLength(3);
    expect(result!.stops[0].color).toBe("#2fb1bf");
    expect(result!.stops[0].position).toBe(0);
  });

  it("parses a radial gradient", () => {
    const result = parseGradientUrl(serializeGradient(radialState));
    expect(result).not.toBeNull();
    expect(result!.type).toBe("radial");
    expect(result!.radialPosition).toBe("top left");
    expect(result!.stops).toHaveLength(2);
  });

  it("round-trips linear state", () => {
    const result = parseGradientUrl(serializeGradient(linearState));
    expect(result!.type).toBe(linearState.type);
    expect(result!.directionAngle).toBe(linearState.directionAngle);
    expect(
      result!.stops.map((s) => ({ color: s.color, position: s.position })),
    ).toEqual(
      linearState.stops.map((s) => ({ color: s.color, position: s.position })),
    );
  });

  it("round-trips radial state", () => {
    const result = parseGradientUrl(serializeGradient(radialState));
    expect(result!.type).toBe(radialState.type);
    expect(result!.radialPosition).toBe(radialState.radialPosition);
    expect(
      result!.stops.map((s) => ({ color: s.color, position: s.position })),
    ).toEqual(
      radialState.stops.map((s) => ({ color: s.color, position: s.position })),
    );
  });

  it("assigns fresh ids on parse", () => {
    const result = parseGradientUrl(serializeGradient(linearState));
    const ids = result!.stops.map((s) => s.id);
    expect(ids).not.toContain("1");
    expect(ids).not.toContain("2");
    expect(ids).not.toContain("3");
  });

  it("returns null for missing type", () => {
    expect(parseGradientUrl("?angle=135&stops=ff0000:0,0000ff:100")).toBeNull();
  });

  it("returns null for invalid type", () => {
    expect(
      parseGradientUrl("?type=conic&angle=135&stops=ff0000:0,0000ff:100"),
    ).toBeNull();
  });

  it("returns null for invalid angle", () => {
    expect(
      parseGradientUrl("?type=linear&angle=99&stops=ff0000:0,0000ff:100"),
    ).toBeNull();
  });

  it("returns null for invalid radial position", () => {
    expect(
      parseGradientUrl("?type=radial&pos=diagonal&stops=ff0000:0,0000ff:100"),
    ).toBeNull();
  });

  it("returns null for missing stops", () => {
    expect(parseGradientUrl("?type=linear&angle=135")).toBeNull();
  });

  it("returns null for fewer than 2 stops", () => {
    expect(
      parseGradientUrl("?type=linear&angle=135&stops=ff0000:0"),
    ).toBeNull();
  });

  it("returns null for invalid color", () => {
    expect(
      parseGradientUrl("?type=linear&angle=135&stops=gggggg:0,0000ff:100"),
    ).toBeNull();
  });

  it("returns null for stop position out of range", () => {
    expect(
      parseGradientUrl("?type=linear&angle=135&stops=ff0000:-1,0000ff:100"),
    ).toBeNull();
    expect(
      parseGradientUrl("?type=linear&angle=135&stops=ff0000:0,0000ff:101"),
    ).toBeNull();
  });

  it("returns null for partial stop position string", () => {
    expect(
      parseGradientUrl("?type=linear&angle=135&stops=ff0000:50abc,0000ff:100"),
    ).toBeNull();
  });

  it("returns null for empty search string", () => {
    expect(parseGradientUrl("")).toBeNull();
  });
});
