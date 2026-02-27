import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/16/solid";
import { useShallow } from "zustand/shallow";

import { Select } from "@/components/Select";
import { useGradientStore } from "@/stores/gradient";

const OPTIONS = [
  { value: 270, label: "To Left", icon: ArrowLeftIcon },
  { value: 90, label: "To Right", icon: ArrowRightIcon },
  { value: 0, label: "To Top", icon: ArrowUpIcon },
  { value: 180, label: "To Bottom", icon: ArrowDownIcon },
  { value: 315, label: "To Top Left", icon: ArrowUpLeftIcon },
  { value: 45, label: "To Top Right", icon: ArrowUpRightIcon },
  { value: 225, label: "To Bottom Left", icon: ArrowDownLeftIcon },
  { value: 135, label: "To Bottom Right", icon: ArrowDownRightIcon },
] as const;

export const DirectionSelect = () => {
  const [directionAngle, setDirectionAngle] = useGradientStore(
    useShallow((s) => [s.directionAngle, s.setDirectionAngle]),
  );

  return (
    <Select
      label="Gradient Direction"
      options={OPTIONS}
      value={directionAngle}
      onChange={setDirectionAngle}
    />
  );
};
