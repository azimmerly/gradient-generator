import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";

import { getRandomColor } from "@/utils/getRandomColor";

export type GradientType = "linear" | "radial";

export type ColorStop = {
  id: string;
  color: string;
  position: number;
};

type GradientStore = {
  type: GradientType;
  angle: number;
  stops: ColorStop[];
  selectedStop: string;
  setType: (type: GradientType) => void;
  setAngle: (angle: number) => void;
  setSelectedStop: (id: string) => void;
  updateStop: (id: string, partialStop: Partial<ColorStop>) => void;
  addStop: () => void;
  removeStop: (id: string) => void;
  reorderStops: (ids: string[]) => void;
};

const initialStops: ColorStop[] = [
  { id: nanoid(), color: "#f76a98", position: 0 },
  { id: nanoid(), color: "#8160ff", position: 40 },
  { id: nanoid(), color: "#043390", position: 80 },
];

export const useGradientStore = create<GradientStore>((set) => ({
  type: "linear",
  angle: 135,
  stops: initialStops,
  selectedStop: initialStops[0].id,
  setType: (type) => set({ type }),
  setAngle: (angle) => set({ angle }),
  setSelectedStop: (id) => set({ selectedStop: id }),
  updateStop: (id, partialStop) => {
    set((state) => ({
      stops: state.stops.map((stop) => {
        return stop.id === id ? { ...stop, ...partialStop } : stop;
      }),
    }));
  },
  addStop: () => {
    set((state) => {
      const newStopId = nanoid();
      const lastStop = state.stops[state.stops.length - 1];
      const newStop: ColorStop = {
        id: newStopId,
        color: getRandomColor(),
        position: Math.min(lastStop.position + 10, 100),
      };
      return {
        stops: [...state.stops, newStop],
        selectedStop: newStopId,
      };
    });
  },
  removeStop: (id) => {
    set((state) => {
      if (state.stops.length <= 2) {
        return state;
      }
      const newStops = state.stops.filter((stop) => stop.id !== id);
      const newSelectedStop =
        state.selectedStop === id
          ? newStops[newStops.length - 1].id
          : state.selectedStop;
      return {
        stops: newStops,
        selectedStop: newSelectedStop,
      };
    });
  },
  reorderStops: (ids) => {
    set((state) => ({
      stops: ids.map((id) => {
        return state.stops.find((stop) => stop.id === id)!;
      }),
    }));
  },
}));
