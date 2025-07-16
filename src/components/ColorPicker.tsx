import { HexColorPicker } from "react-colorful";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";
import { useDebouncedCallback } from "@/utils/useDebouncedCallback";

export const ColorPicker = () => {
  const { stops, updateStop, selectedStop } = useGradientStore(
    useShallow((s) => ({
      stops: s.stops,
      updateStop: s.updateStop,
      selectedStop: s.selectedStop,
    })),
  );

  const debouncedUpdateStop = useDebouncedCallback(updateStop, 100);
  const handleChange = (color: string) => {
    debouncedUpdateStop(selectedStop, { color });
  };

  const currentStop = stops.find(({ id }) => id === selectedStop);

  return (
    <HexColorPicker
      color={currentStop?.color}
      onChange={handleChange}
      className="max-h-44 max-w-44"
    />
  );
};
