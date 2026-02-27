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
    <div className="divide-x divide-mist-200 overflow-hidden rounded-md border border-mist-200 shadow-xs">
      {GRADIENT_TYPES.map((type) => (
        <Button
          key={type}
          disabled={currentType === type}
          onClick={() => setType(type)}
          className={twMerge(
            "w-18 bg-white py-1.75 text-sm capitalize transition-colors",
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
