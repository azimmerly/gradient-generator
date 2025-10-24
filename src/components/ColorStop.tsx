import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Field, Input } from "@headlessui/react";
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id });

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
  const isSelected = selectedStop === stop.id;

  return (
    <li
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className={twMerge(
        "flex w-fit items-center gap-1 rounded-lg px-3 py-2",
        isSelected && "bg-gray-200 shadow-xs",
        isSelected && isDragging && "shadow-md",
        isDragging && "z-50",
      )}
    >
      <div
        className="flex items-center gap-3"
        onClick={() => setSelectedStop(stop.id)}
      >
        <Button
          {...listeners}
          {...attributes}
          aria-label="grab color stop"
          className="-mr-1 cursor-grab touch-none rounded p-0.5 text-gray-400 transition hover:text-gray-500 active:cursor-grabbing"
        >
          <ChevronUpDownIcon className="size-5" />
        </Button>
        <div
          className="size-7 rounded outline-1 outline-gray-300"
          style={{ background: stop.color }}
        />
        <Field className="font-code relative text-sm font-medium">
          <label className="sr-only" htmlFor={`color-${stop.id}`}>
            Color hex
          </label>
          <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-gray-500/90">
            #
          </span>
          <HexColorInput
            id={`color-${stop.id}`}
            disabled={isDragging}
            color={stop.color}
            onChange={handleUpdateColor}
            className="w-20 rounded bg-white p-1 pl-5 text-left outline-1 outline-gray-300 transition focus:outline-gray-500"
          />
        </Field>
        <Field className="font-code relative text-sm font-medium">
          <label className="sr-only" htmlFor={`position-${stop.id}`}>
            Color position
          </label>
          <Input
            id={`position-${stop.id}`}
            disabled={isDragging}
            value={stop.position}
            onChange={handleUpdatePosition}
            className="w-12.5 cursor-text rounded bg-white p-1 pr-5 text-right outline-1 outline-gray-300 transition focus:outline-gray-500"
          />
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500/90">
            %
          </span>
        </Field>
      </div>
      <Button
        disabled={disableRemove || isDragging}
        onClick={() => removeStop(stop.id)}
        aria-label="remove color stop"
        className={twMerge(
          "ml-1.5 h-fit rounded-full",
          disableRemove ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <XMarkIcon
          strokeWidth={2}
          className={twMerge(
            "size-5 transition",
            disableRemove
              ? "text-gray-400/60"
              : "text-gray-400 hover:text-gray-500",
          )}
        />
      </Button>
    </li>
  );
};
