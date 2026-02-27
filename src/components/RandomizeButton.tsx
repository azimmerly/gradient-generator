import { Button } from "@headlessui/react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import diceImage from "@/assets/dice.png";
import { useGradientStore } from "@/stores/gradient";
import { getRandomColor } from "@/utils/getRandomColor";

export const RandomizeButton = () => {
  const [busy, setBusy] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleRandomize = () => {
    setBusy(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setBusy(false), 400);

    const angles = [0, 45, 90, 135, 180, 225, 270, 315] as const;
    const numStops = Math.random() > 0.5 ? 3 : 4;
    const positions = [0, 40, 80, 100].slice(0, numStops);

    const newStops = positions.map((position) => ({
      id: crypto.randomUUID(),
      color: getRandomColor(),
      position,
    }));

    useGradientStore.setState({
      angle: angles[Math.floor(Math.random() * angles.length)],
      type: Math.random() > 0.5 ? "linear" : "radial",
      stops: newStops,
      selectedStop: newStops[0].id,
    });
  };

  return (
    <Button
      disabled={busy}
      onClick={handleRandomize}
      className={twMerge(
        "mt-0.5 flex w-fit items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 shadow-xs ring-1 ring-gray-200 transition will-change-transform ring-inset hover:bg-gray-50",
        busy
          ? "cursor-default bg-gray-50"
          : "cursor-pointer active:translate-y-px active:scale-99",
      )}
    >
      <img
        alt=""
        aria-hidden="true"
        src={diceImage}
        className={twMerge(
          "size-4.5 transform-gpu will-change-transform",
          busy && "animate-shake",
        )}
      />
      Randomize
    </Button>
  );
};
