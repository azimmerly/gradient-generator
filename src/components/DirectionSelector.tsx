import { useState } from "react";
import Select, { type SingleValue } from "react-select";

import type { Direction, Gradient, UpdateDirection } from "types";
import { Container } from "./DirectionSelector.style";

type DirectionSelectorProps = {
  gradient: Gradient;
  updateDirection: UpdateDirection;
};

export const DirectionSelector = ({
  gradient,
  updateDirection,
}: DirectionSelectorProps) => {
  const [direction, setDirection] = useState(gradient.direction);

  const gradientDirections: Direction[] = [
    { value: "to left", label: "To Left" },
    { value: "to right", label: "To Right" },
    { value: "to top", label: "To Top" },
    { value: "to bottom", label: "To Bottom" },
    { value: "to top left", label: "To Top Left" },
    { value: "to top right", label: "To Top Right" },
    { value: "to bottom left", label: "To Bottom Left" },
    { value: "to bottom right", label: "To Bottom Right" },
  ] as const;

  const handleChange = (selectedDirection: SingleValue<Direction>) => {
    updateDirection(selectedDirection as Direction);
    setDirection(selectedDirection as Direction);
  };

  return (
    <Container>
      <Select
        onChange={handleChange}
        defaultValue={direction}
        options={gradientDirections}
      />
    </Container>
  );
};
