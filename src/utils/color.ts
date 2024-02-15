import convert from "color-convert";

export const hexToRgb = (hexColor: string) => {
  const rgb = convert.hex.rgb(hexColor);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

export const hexToHsl = (hexColor: string) => {
  const hsl = convert.hex.hsl(hexColor);
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};
