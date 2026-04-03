import { HexColorPicker } from "react-colorful";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";
import { useDebouncedCallback } from "@/utils/useDebouncedCallback";

export const ColorPicker = () => {
  const { currentColor, updateStop, selectedStop } = useGradientStore(
    useShallow(({ stops, selectedStop, updateStop }) => ({
      currentColor: stops.find(({ id }) => id === selectedStop)?.color,
      updateStop: updateStop,
      selectedStop: selectedStop,
    })),
  );

  const debouncedUpdateStop = useDebouncedCallback(updateStop, 150);
  const handleChange = (color: string) => {
    debouncedUpdateStop(selectedStop, { color });
  };

  return (
    <HexColorPicker
      color={currentColor}
      onChange={handleChange}
      className="mt-2 max-h-44 max-w-44 lg:mt-0"
    />
  );
};
