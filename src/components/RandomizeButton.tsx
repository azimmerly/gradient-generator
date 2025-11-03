import { Button } from "@headlessui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import diceImage from "@/assets/dice.png";
import { useGradientStore } from "@/stores/gradient";
import { getRandomColor } from "@/utils/getRandomColor";

export const RandomizeButton = () => {
  const [busy, setBusy] = useState(false);

  const handleRandomize = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 350);

    const angles = [0, 45, 90, 135, 180, 225, 270, 315] as const;
    const numStops = Math.random() > 0.5 ? 3 : 4;
    const positions = [0, 40, 80, 100].slice(0, numStops);

    const newStops = positions.map((position) => ({
      id: nanoid(),
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
        "flex w-fit transform-gpu items-center gap-1 rounded-md p-1 text-sm font-semibold transition will-change-transform hover:text-gray-600",
        busy
          ? "cursor-default text-gray-600"
          : "cursor-pointer active:scale-96",
      )}
    >
      <img
        alt=""
        aria-hidden="true"
        src={diceImage}
        className={twMerge(
          "size-[19px] transform-gpu will-change-transform",
          busy && "animate-shake",
        )}
      />
      Randomize
    </Button>
  );
};
