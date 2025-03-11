import { useCallback, useState } from "react";

import { ColorOptions, GradientDisplay, Wave } from "components";
import type {
  Gradient,
  UpdateColor,
  UpdateDirection,
  UpdateFormat,
} from "types";
import {
  ColorSection,
  Container,
  HeaderSection,
  Heading,
  WaveContainer,
} from "./App.style";

const initialGradient: Gradient = {
  format: "hex",
  direction: { value: "to right", label: "To Right" },
  colors: { 1: "#f76a98", 2: "#8160ff" },
} as const;

export const App = () => {
  const [gradient, setGradient] = useState(initialGradient);

  const updateDirection: UpdateDirection = useCallback(
    (newDirection) => {
      setGradient({ ...gradient, direction: newDirection });
    },
    [gradient, setGradient],
  );

  const updateFormat: UpdateFormat = useCallback(
    (newFormat) => {
      setGradient({ ...gradient, format: newFormat });
    },
    [gradient, setGradient],
  );

  const updateColor: UpdateColor = useCallback((colorNum, newColor) => {
    setGradient((prevGradient) => {
      const updatedGradient = { ...prevGradient };
      updatedGradient.colors[colorNum] = newColor;
      return updatedGradient;
    });
  }, []);

  return (
    <Container>
      <HeaderSection>
        <Heading gradient={gradient}>Gradient Generator</Heading>
        <ColorOptions
          gradient={gradient}
          updateColor={updateColor}
          updateDirection={updateDirection}
        />
      </HeaderSection>
      <ColorSection gradient={gradient}>
        <WaveContainer>
          <Wave color="#fff" />
        </WaveContainer>
        <GradientDisplay gradient={gradient} updateFormat={updateFormat} />
      </ColorSection>
    </Container>
  );
};
