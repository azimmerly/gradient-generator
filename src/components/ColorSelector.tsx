import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FaBrush } from "react-icons/fa6";

import type { ColorNum, UpdateColor } from "types";
import { useClickOutside } from "utils/useClickOutside";
import { ColorButton, ColorPicker, Container } from "./ColorSelector.style";

type ColorSelectorProps = {
  color: string;
  colorNum: ColorNum;
  updateColor: UpdateColor;
};

export const ColorSelector = ({
  color,
  colorNum,
  updateColor,
}: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(colorPickerRef, () => setIsOpen(false));

  useEffect(() => {
    updateColor(colorNum, currentColor);
  }, [colorNum, currentColor, updateColor]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <Container>
      <ColorButton
        buttoncolor={currentColor}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <FaBrush />
        Color {colorNum}
      </ColorButton>
      {isOpen && (
        <ColorPicker onKeyDown={handleKeyDown} ref={colorPickerRef}>
          <HexColorPicker color={currentColor} onChange={setCurrentColor} />
        </ColorPicker>
      )}
    </Container>
  );
};
