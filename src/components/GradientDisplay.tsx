import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa6";

import { FormatSelector, Toast } from "components";
import type { Gradient, UpdateFormat } from "types";
import { hexToHsl, hexToRgb } from "utils/color";
import { Container, GradientText, StyledButton } from "./GradientDisplay.style";

type GradientDisplayProps = {
  gradient: Gradient;
  updateFormat: UpdateFormat;
};

export const GradientDisplay = ({
  gradient,
  updateFormat,
}: GradientDisplayProps) => {
  const [isToast, setIsToast] = useState(false);

  const { direction, format, colors } = gradient;
  const hexColor1 = colors[1];
  const hexColor2 = colors[2];

  const handleToast = () => {
    setIsToast(true);

    const timeout = setTimeout(() => {
      setIsToast(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  };

  const COLOR_MAP = {
    hex: {
      1: hexColor1,
      2: hexColor2,
    },
    rgb: {
      1: hexToRgb(hexColor1),
      2: hexToRgb(hexColor2),
    },
    hsl: {
      1: hexToHsl(hexColor1),
      2: hexToHsl(hexColor2),
    },
  } as const;

  const gradientText = `background: linear-gradient(${direction.value}, ${COLOR_MAP[format][1]}, ${COLOR_MAP[format][2]});`;

  return (
    <Container>
      <FormatSelector gradient={gradient} updateFormat={updateFormat} />
      <GradientText>{gradientText}</GradientText>
      <CopyToClipboard text={gradientText} onCopy={handleToast}>
        <StyledButton disabled={isToast}>
          <FaCopy />
          Copy CSS
        </StyledButton>
      </CopyToClipboard>
      {isToast && <Toast />}
    </Container>
  );
};
