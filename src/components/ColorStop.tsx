import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Input } from "@headlessui/react";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { HexColorInput } from "react-colorful";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

import {
  useGradientStore,
  type ColorStop as ColorStopType,
} from "@/stores/gradient";

type ColorStopProps = {
  stop: ColorStopType;
};

export const ColorStop = ({ stop }: ColorStopProps) => {
  const { stops, updateStop, removeStop, selectedStop, setSelectedStop } =
    useGradientStore(
      useShallow((s) => ({
        stops: s.stops,
        updateStop: s.updateStop,
        removeStop: s.removeStop,
        selectedStop: s.selectedStop,
        setSelectedStop: s.setSelectedStop,
      })),
    );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: stop.id });

  const handleUpdatePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num) || num < 0 || num > 100) {
      return;
    }
    updateStop(stop.id, { position: num });
  };

  const handleUpdateColor = (color: string) => {
    updateStop(stop.id, { color });
  };

  const disableRemove = stops.length <= 2;

  return (
    <li
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className={twMerge(
        "flex w-fit items-center gap-1 rounded-lg px-3 py-2",
        selectedStop === stop.id && "bg-gray-200 shadow-xs",
      )}
    >
      <div
        onClick={() => setSelectedStop(stop.id)}
        className="flex cursor-pointer items-center gap-3 transition"
      >
        <div
          {...listeners}
          {...attributes}
          className="-mr-1 cursor-grab rounded p-0.5 text-gray-400 transition hover:text-gray-500 active:cursor-grabbing"
        >
          <ChevronUpDownIcon className="size-5" />
        </div>
        <div
          className="size-7 rounded outline-1 outline-gray-300"
          style={{ background: stop.color }}
        />
        <HexColorInput
          prefixed
          name="hex-color"
          color={stop.color}
          onChange={handleUpdateColor}
          className="font-code w-22 rounded bg-white px-2 py-1 text-center text-sm font-medium outline-1 outline-gray-300"
        />
        <Input
          name="position"
          className="w-9 cursor-text rounded bg-white p-1 text-center text-sm font-medium outline-1 outline-gray-300"
          value={stop.position}
          onChange={handleUpdatePosition}
        />
      </div>
      <Button
        disabled={disableRemove}
        onClick={() => removeStop(stop.id)}
        className={twMerge(
          "ml-1.5 h-fit rounded-full",
          disableRemove ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <XMarkIcon
          strokeWidth={2}
          className={twMerge(
            "size-5 text-gray-400 transition",
            !disableRemove && "hover:text-gray-500",
          )}
        />
      </Button>
    </li>
  );
};
