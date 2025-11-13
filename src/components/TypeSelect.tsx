import { Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";

export const TypeSelect = () => {
  const [type, setType] = useGradientStore(
    useShallow((s) => [s.type, s.setType]),
  );

  return (
    <div className="flex w-fit rounded-md text-sm shadow-xs">
      <Button
        disabled={type === "linear"}
        onClick={() => setType("linear")}
        className={twMerge(
          "w-19 rounded-l-md bg-white py-2 ring-1 ring-gray-200 transition-colors ring-inset",
          type === "linear"
            ? "bg-gray-100 font-semibold"
            : "cursor-pointer bg-white hover:bg-gray-50",
        )}
      >
        Linear
      </Button>
      <Button
        disabled={type === "radial"}
        onClick={() => setType("radial")}
        className={twMerge(
          "-ml-px w-19 rounded-r-md bg-white py-2 ring-1 ring-gray-200 transition-colors ring-inset",
          type === "radial"
            ? "bg-gray-100 font-semibold"
            : "cursor-pointer bg-white hover:bg-gray-50",
        )}
      >
        Radial
      </Button>
    </div>
  );
};
