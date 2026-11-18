import { Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

import { GRADIENT_TYPES } from "@/consts";
import { useGradientStore } from "@/stores/gradient";

export const TypeToggle = () => {
  const [currentType, setType] = useGradientStore(
    useShallow((s) => [s.type, s.setType]),
  );

  return (
    <div
      role="group"
      aria-label="Gradient Type"
      className="grid w-67.5 grid-cols-2 divide-x divide-mist-200 overflow-hidden rounded-lg border border-mist-200 shadow-xs lg:w-45"
    >
      {GRADIENT_TYPES.map((type) => (
        <Button
          key={type}
          aria-pressed={currentType === type}
          onClick={() => currentType !== type && setType(type)}
          className={twMerge(
            "h-9 bg-white text-sm capitalize transition-colors",
            currentType === type
              ? "bg-mist-100 font-semibold"
              : "cursor-pointer hover:bg-mist-50",
          )}
        >
          {type}
        </Button>
      ))}
    </div>
  );
};
