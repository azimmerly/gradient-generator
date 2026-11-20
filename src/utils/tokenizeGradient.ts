type GradientTokenType =
  "function" | "direction" | "value" | "punctuation" | "text";

type GradientToken = {
  type: GradientTokenType;
  text: string;
};

const TOKEN_PATTERN = /([a-z]+-gradient|#[0-9a-f]{6}|\d+(?:deg|%)|[(),])/i;

const TOKEN_RULES: [RegExp, GradientTokenType][] = [
  [/^[a-z]+-gradient$/i, "function"],
  [/^\d+deg$/i, "direction"],
  [/^(#[0-9a-f]{6}|\d+%)$/i, "value"],
  [/^[(),]$/, "punctuation"],
  [/\S/, "direction"],
] as const;

const getTokenType = (text: string): GradientTokenType =>
  TOKEN_RULES.find(([pattern]) => pattern.test(text))?.[1] ?? "text";

export const tokenizeGradient = (css: string): GradientToken[] =>
  css
    .split(TOKEN_PATTERN)
    .filter(Boolean)
    .map((text) => ({ type: getTokenType(text), text }));
