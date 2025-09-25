import { Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

import { useGradientStore } from "@/stores/gradient";

export const TypeSelect = () => {
  const [type, setType] = useGradientStore(
    useShallow((s) => [s.type, s.setType]),
  );

  return (
    <div className="flex w-fit text-sm shadow-xs">
      <Button
        disabled={type === "linear"}
        onClick={() => setType("linear")}
        className={twMerge(
          "w-18 rounded-l-md bg-white px-3 py-2 ring-1 ring-gray-300 transition ring-inset",
          type === "linear"
            ? "bg-gray-100 font-semibold"
            : "cursor-pointer bg-white hover:bg-gray-100/30",
        )}
      >
        Linear
      </Button>
      <Button
        disabled={type === "radial"}
        onClick={() => setType("radial")}
        className={twMerge(
          "-ml-px w-18 rounded-r-md bg-white px-3 py-2 ring-1 ring-gray-300 transition ring-inset",
          type === "radial"
            ? "bg-gray-100 font-semibold"
            : "cursor-pointer bg-white hover:bg-gray-100/30",
        )}
      >
        Radial
      </Button>
    </div>
  );
};
