import { DIRECTION_ANGLES, GRADIENT_TYPES, RADIAL_POSITIONS } from "@/consts";
import type {
  DirectionAngle,
  GradientState,
  GradientType,
  RadialPosition,
} from "@/types";

export const serializeGradient = (state: GradientState) => {
  const params = new URLSearchParams({ type: state.type });

  if (state.type === "linear") {
    params.set("angle", state.directionAngle.toString());
    params.delete("pos");
  } else {
    params.set("pos", state.radialPosition);
    params.delete("angle");
  }

  params.set(
    "stops",
    state.stops
      .map(({ color, position }) => `${color.slice(1)}:${position}`)
      .join(","),
  );

  return `?${params.toString()}`;
};

export const parseGradientUrl = (search: string) => {
  const params = new URLSearchParams(search);
  const type = params.get("type") as GradientType;
  const angle = parseInt(params.get("angle") ?? "") as DirectionAngle;
  const pos = params.get("pos") as RadialPosition;

  if (
    !GRADIENT_TYPES.includes(type) ||
    (type === "radial" && !RADIAL_POSITIONS.includes(pos)) ||
    (type === "linear" && !DIRECTION_ANGLES.includes(angle))
  ) {
    return null;
  }

  const stopsStr = params.get("stops");
  if (!stopsStr) {
    return null;
  }

  const stops = stopsStr.split(",").map((s) => {
    const [colorHex, posStr] = s.split(":");
    return {
      id: crypto.randomUUID(),
      color: `#${colorHex}`,
      position: Number(posStr),
    };
  });

  if (
    stops.length < 2 ||
    stops.some((s) => !/^#[0-9a-fA-F]{6}$/.test(s.color)) ||
    stops.some((s) => isNaN(s.position) || s.position < 0 || s.position > 100)
  ) {
    return null;
  }

  return {
    type,
    stops,
    directionAngle: type === "linear" ? angle : 135,
    radialPosition: type === "radial" ? pos : "center",
  } as GradientState;
};
