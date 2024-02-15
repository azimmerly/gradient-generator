export type ColorNum = 1 | 2;
export type Format = "hex" | "rgb" | "hsl";
export type Direction = {
  value: string;
  label: string;
};

export type Gradient = {
  format: Format;
  direction: Direction;
  colors: Record<ColorNum, string>;
};

export type UpdateFormat = (format: Format) => void;
export type UpdateDirection = (direction: Direction) => void;
export type UpdateColor = (colorNum: ColorNum, color: string) => void;
