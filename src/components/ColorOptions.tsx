import { ColorSelector, DirectionSelector } from "components";
import type { Gradient, UpdateColor, UpdateDirection } from "types";
import { ColorSelectors, Container } from "./ColorOptions.style";

type ColorOptionsProps = {
  gradient: Gradient;
  updateDirection: UpdateDirection;
  updateColor: UpdateColor;
};

export const ColorOptions = ({
  gradient,
  updateDirection,
  updateColor,
}: ColorOptionsProps) => (
  <Container>
    <DirectionSelector gradient={gradient} updateDirection={updateDirection} />
    <ColorSelectors>
      <ColorSelector
        colorNum={1}
        color={gradient.colors[1]}
        updateColor={updateColor}
      />
      <ColorSelector
        colorNum={2}
        color={gradient.colors[2]}
        updateColor={updateColor}
      />
    </ColorSelectors>
  </Container>
);
