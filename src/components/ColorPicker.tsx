import { HexColorPicker } from "react-colorful";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";

export const ColorPicker = () => {
  const { currentColor, updateStop, selectedStop } = useGradientStore(
    useShallow(({ stops, selectedStop, updateStop }) => ({
      currentColor: stops.find(({ id }) => id === selectedStop)?.color,
      updateStop: updateStop,
      selectedStop: selectedStop,
    })),
  );

  return (
    <HexColorPicker
      color={currentColor}
      onChangeEnd={(color) => updateStop(selectedStop, { color })}
      className="mt-2 max-h-44 max-w-44 lg:mt-0"
    />
  );
};
