import React, { useState } from "react";
import { ChromePicker } from "react-color";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./style";

function ColorOptions(props) {
  const { gradient, updateDirection, updateColor, updateType } = props;
  const classes = useStyles(gradient);
  const [colorPicker1, setColorPicker1] = useState(false);
  const [colorPicker2, setColorPicker2] = useState(false);

  const toggleColorPicker = (selectedColor) => {
    if (selectedColor === "color1") setColorPicker1(!colorPicker1);
    if (selectedColor === "color2") setColorPicker2(!colorPicker2);
  };

  const handleDirectionChange = (e) => {
    updateDirection(e.target.value);
  };

  const handleTypeChange = (e) => {
    updateType(e.target.value);
  };

  const handleColorChange = (colorNum, e) => {
    const newHexColor = e.hex;
    const newRgbColor = `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b})`;
    updateColor(colorNum, newHexColor, newRgbColor);
    setColorPicker1(false);
    setColorPicker2(false);
  };

  return (
    <div className={classes.optionsSection}>
      <FormControl className={classes.directionForm}>
        <InputLabel>Gradient Direction</InputLabel>
        <Select value={gradient.direction} onChange={handleDirectionChange}>
          <MenuItem value={"to left"}>To Left</MenuItem>
          <MenuItem value={"to right"}>To Right</MenuItem>
          <MenuItem value={"to top"}>To Top</MenuItem>
          <MenuItem value={"to bottom"}>To Bottom</MenuItem>
          <MenuItem value={"to top left"}>To Top Left</MenuItem>
          <MenuItem value={"to top right"}>To Top Right</MenuItem>
          <MenuItem value={"to bottom left"}>To Bottom Left</MenuItem>
          <MenuItem value={"to bottom right"}>To Bottom Right</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.colorButtons}>
        <div className={classes.colorSelector}>
          <Button
            size="large"
            variant="contained"
            className={classes.colorButton1}
            onClick={() => toggleColorPicker("color1")}
            onKeyDown={(e) => e.key === "Escape" && toggleColorPicker("color1")}
          >
            Color 1
          </Button>
          {colorPicker1 && (
            <ChromePicker
              disableAlpha={true}
              color={gradient.color1}
              className={classes.colorPicker}
              onChangeComplete={(e) => handleColorChange("color1", e)}
            />
          )}
        </div>
        <div className={classes.colorSelector}>
          <Button
            size="large"
            variant="contained"
            className={classes.colorButton2}
            onClick={() => toggleColorPicker("color2")}
            onKeyDown={(e) => e.key === "Escape" && toggleColorPicker("color2")}
          >
            Color 2
          </Button>
          {colorPicker2 && (
            <ChromePicker
              disableAlpha={true}
              color={gradient.color2}
              className={classes.colorPicker}
              onChangeComplete={(e) => handleColorChange("color2", e)}
            />
          )}
        </div>
      </div>
      <FormControl className={classes.formatForm}>
        <RadioGroup value={gradient.type} onChange={handleTypeChange}>
          <FormControlLabel
            value="hex"
            label="HEX"
            control={<Radio color="default" />}
          />
          <FormControlLabel
            value="rgb"
            label="RGB"
            control={<Radio color="default" />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default ColorOptions;
