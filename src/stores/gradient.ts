import { create } from "zustand";

import type { ColorStop, GradientState } from "@/types";
import { getRandomColor } from "@/utils/getRandomColor";

type GradientStore = GradientState & {
  selectedStop: string;
  setType: (type: GradientState["type"]) => void;
  setDirectionAngle: (angle: GradientState["directionAngle"]) => void;
  setRadialPosition: (position: GradientState["radialPosition"]) => void;
  setSelectedStop: (id: string) => void;
  updateStop: (id: string, partialStop: Partial<ColorStop>) => void;
  addStop: () => void;
  removeStop: (id: string) => void;
  reorderStops: (ids: string[]) => void;
};

const initialState: GradientState = {
  type: "linear",
  directionAngle: 135,
  radialPosition: "center",
  stops: [
    { id: crypto.randomUUID(), color: "#2fb1bf", position: 0 },
    { id: crypto.randomUUID(), color: "#eafbca", position: 40 },
    { id: crypto.randomUUID(), color: "#6082f8", position: 80 },
  ],
};

export const useGradientStore = create<GradientStore>((set) => ({
  ...initialState,
  selectedStop: initialState.stops[0].id,
  setType: (type) => set({ type }),
  setDirectionAngle: (directionAngle) => set({ directionAngle }),
  setRadialPosition: (radialPosition) => set({ radialPosition }),
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
      const newStopId = crypto.randomUUID();
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
