import React, { useState } from "react";
import ColorCopy from "../ColorCopy";
import ColorOptions from "../ColorOptions";
import Wave from "../Wave";
import useStyles from "./style";

function App() {
  const initialGradient = {
    type: "hex",
    direction: "to right",
    color1: { hex: "#f76a98", rgb: "rgb(247, 106, 152)" },
    color2: { hex: "#8060ff", rgb: "rgb(128, 96, 255)" },
  };
  const [gradient, setGradient] = useState(initialGradient);
  const classes = useStyles(gradient);

  const updateType = (newType) => {
    setGradient({ ...gradient, type: newType });
  };

  const updateDirection = (newDirection) => {
    setGradient({ ...gradient, direction: newDirection });
  };

  const updateColor = (colorNum, newHexColor, newRgbColor) => {
    const newColor = { hex: newHexColor, rgb: newRgbColor };
    setGradient({ ...gradient, [colorNum]: newColor });
  };

  return (
    <div className={classes.container}>
      <header className={classes.headerSection}>
        <h1 className={classes.headingPrimary}>Gradient Generator</h1>
        <ColorOptions
          gradient={gradient}
          updateType={updateType}
          updateColor={updateColor}
          updateDirection={updateDirection}
        />
      </header>
      <div className={classes.colorSection}>
        <Wave />
        <ColorCopy gradient={gradient} />
      </div>
    </div>
  );
}

export default App;
