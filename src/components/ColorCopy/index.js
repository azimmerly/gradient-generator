import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import useStyles from "./style";

function ColorText({ gradient }) {
  const classes = useStyles(gradient);
  const [snackOpen, setSnackOpen] = useState(false);
  const { type, direction, color1, color2 } = gradient;

  let copyText = "background: linear-gradient";
  if (type === "hex") {
    copyText += `(${direction}, ${color1.hex}, ${color2.hex})`;
  }
  if (type === "rgb") {
    copyText += `(${direction}, ${color1.rgb}, ${color2.rgb})`;
  }

  const toggleSnackbar = () => {
    setSnackOpen(!snackOpen);
  };

  return (
    <div>
      <div className={classes.copySection}>
        <p className={classes.copyText}>{copyText}</p>
        <CopyToClipboard text={copyText} onCopy={toggleSnackbar}>
          <Button
            size="large"
            color="inherit"
            variant="outlined"
            className={classes.copyButton}
            onClick={(e) => e.stopPropagation()}
          >
            Copy CSS <FileCopyOutlinedIcon className={classes.copyIcon} />
          </Button>
        </CopyToClipboard>
      </div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="CSS Copied to Clipboard!"
        onClose={toggleSnackbar}
        action={[
          <IconButton key="close" color="inherit" onClick={toggleSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

export default ColorText;
