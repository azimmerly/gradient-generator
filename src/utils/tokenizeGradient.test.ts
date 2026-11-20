import { tokenizeGradient } from "./tokenizeGradient";

describe("tokenizeGradient", () => {
  it("returns no tokens for an empty string", () => {
    expect(tokenizeGradient("")).toEqual([]);
  });

  it("tokenizes a linear gradient", () => {
    expect(tokenizeGradient("linear-gradient(90deg, #aabbcc 0%)")).toEqual([
      { type: "function", text: "linear-gradient" },
      { type: "punctuation", text: "(" },
      { type: "direction", text: "90deg" },
      { type: "punctuation", text: "," },
      { type: "text", text: " " },
      { type: "value", text: "#aabbcc" },
      { type: "text", text: " " },
      { type: "value", text: "0%" },
      { type: "punctuation", text: ")" },
    ]);
  });

  it("tags radial position keywords as direction", () => {
    expect(
      tokenizeGradient("radial-gradient(circle at top left, #AABBCC 50%)"),
    ).toEqual([
      { type: "function", text: "radial-gradient" },
      { type: "punctuation", text: "(" },
      { type: "direction", text: "circle at top left" },
      { type: "punctuation", text: "," },
      { type: "text", text: " " },
      { type: "value", text: "#AABBCC" },
      { type: "text", text: " " },
      { type: "value", text: "50%" },
      { type: "punctuation", text: ")" },
    ]);
  });

  it("round-trips back to the original string", () => {
    const css =
      "linear-gradient(135deg, #2fb1bf 0%, #eafbca 40%, #6082f8 100%)";
    expect(
      tokenizeGradient(css)
        .map(({ text }) => text)
        .join(""),
    ).toBe(css);
  });
});
