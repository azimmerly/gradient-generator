import { DIRECTION_ANGLES, GRADIENT_TYPES, RADIAL_POSITIONS } from "@/consts";

export type GradientType = (typeof GRADIENT_TYPES)[number];
export type DirectionAngle = (typeof DIRECTION_ANGLES)[number];
export type RadialPosition = (typeof RADIAL_POSITIONS)[number];
export type ColorStop = { id: string; color: string; position: number };
