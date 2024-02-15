import React, { useState } from "react";

import type { Format, Gradient, UpdateFormat } from "types";
import { Container, Input, Label } from "./FormatSelector.style";

type FormatSelectorProps = {
  gradient: Gradient;
  updateFormat: UpdateFormat;
};

export const FormatSelector = ({
  gradient,
  updateFormat,
}: FormatSelectorProps) => {
  const [selectedFormat, setSelectedFormat] = useState(gradient.format);

  const isSelected = (value: Format) => value === selectedFormat;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormat(e.target.value as Format);
    setSelectedFormat(e.target.value as Format);
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: Format) => {
    if (e.key === "Enter" || e.key === " ") {
      updateFormat(value);
      setSelectedFormat(value);
    }
  };

  const formats = [
    { value: "hex", label: "HEX" },
    { value: "rgb", label: "RGB" },
    { value: "hsl", label: "HSL" },
  ] as const;

  return (
    <Container>
      {formats.map(({ value, label }) => (
        <React.Fragment key={value}>
          <Input
            type="radio"
            id={value}
            value={value}
            checked={isSelected(value)}
            onChange={handleChange}
          />
          <Label
            tabIndex={0}
            role="button"
            onKeyDown={(e) => handleKeyDown(e, value)}
            htmlFor={value}
          >
            {label}
          </Label>
        </React.Fragment>
      ))}
    </Container>
  );
};
