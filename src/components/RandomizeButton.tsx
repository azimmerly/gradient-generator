import { Button } from "@headlessui/react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import diceImage from "@/assets/dice.png";
import { DIRECTION_ANGLES, GRADIENT_TYPES, RADIAL_POSITIONS } from "@/consts";
import { useGradientStore } from "@/stores/gradient";
import { getRandomColor } from "@/utils/getRandomColor";
import { pickRandom } from "@/utils/pickRandom";

export const RandomizeButton = () => {
  const [busy, setBusy] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleRandomize = () => {
    setBusy(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setBusy(false), 400);

    const numStops = pickRandom([2, 3, 4]);
    const positions = [0, 40, 80, 100].slice(0, numStops);
    const newStops = positions.map((position) => ({
      id: crypto.randomUUID(),
      color: getRandomColor(),
      position,
    }));

    useGradientStore.setState({
      type: pickRandom(GRADIENT_TYPES),
      directionAngle: pickRandom(DIRECTION_ANGLES),
      radialPosition: pickRandom(RADIAL_POSITIONS),
      stops: newStops,
      selectedStop: newStops[0].id,
    });
  };

  return (
    <Button
      disabled={busy}
      onClick={handleRandomize}
      className={twMerge(
        "mt-0.5 flex w-fit items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-mist-700 shadow-xs ring-1 ring-mist-200 transition will-change-transform ring-inset hover:bg-mist-50",
        busy
          ? "cursor-default bg-mist-50"
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
