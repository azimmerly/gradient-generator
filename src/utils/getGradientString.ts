import type {
  ColorStop,
  DirectionAngle,
  GradientType,
  RadialPosition,
} from "@/types";

export const getGradientString = ({
  type,
  directionAngle,
  radialPosition,
  stops,
}: {
  type: GradientType;
  directionAngle: DirectionAngle;
  radialPosition: RadialPosition;
  stops: ColorStop[];
}) => {
  if (stops.length === 0) {
    return "";
  }

  const colorStops = stops
    .map(({ color, position }) => `${color} ${position}%`)
    .join(", ");

  return type === "linear"
    ? `linear-gradient(${directionAngle}deg, ${colorStops})`
    : `radial-gradient(circle at ${radialPosition}, ${colorStops})`;
};
