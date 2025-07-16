import type { ColorStop, GradientType } from "@/stores/gradient";

export const getGradientString = ({
  type,
  angle,
  stops,
}: {
  type: GradientType;
  angle: number;
  stops: ColorStop[];
}) => {
  if (stops.length === 0) {
    return "";
  }

  const colorStops = stops
    .map(({ color, position }) => `${color} ${position}%`)
    .join(", ");

  return type === "linear"
    ? `linear-gradient(${angle}deg, ${colorStops})`
    : `radial-gradient(circle, ${colorStops})`;
};
