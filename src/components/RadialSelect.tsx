import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpRightIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/16/solid";
import { useShallow } from "zustand/shallow";

import { Select } from "@/components/Select";
import { useGradientStore } from "@/stores/gradient";

const OPTIONS = [
  { value: "center", label: "Center", icon: ViewfinderCircleIcon },
  { value: "top", label: "Top", icon: ArrowUpIcon },
  { value: "bottom", label: "Bottom", icon: ArrowDownIcon },
  { value: "left", label: "Left", icon: ArrowLeftIcon },
  { value: "right", label: "Right", icon: ArrowRightIcon },
  { value: "top left", label: "Top Left", icon: ArrowUpLeftIcon },
  { value: "top right", label: "Top Right", icon: ArrowUpRightIcon },
  { value: "bottom left", label: "Bottom Left", icon: ArrowDownLeftIcon },
  { value: "bottom right", label: "Bottom Right", icon: ArrowDownRightIcon },
] as const;

export const RadialSelect = () => {
  const [radialPosition, setRadialPosition] = useGradientStore(
    useShallow((s) => [s.radialPosition, s.setRadialPosition]),
  );

  return (
    <Select
      label="Radial Position"
      options={OPTIONS}
      value={radialPosition}
      onChange={setRadialPosition}
    />
  );
};
