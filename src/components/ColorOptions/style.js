import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  optionsSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-primary)",
    fontSize: "var(--font-size-medium)",
    color: "var(--color-black)",
  },

  directionForm: {
    width: "10rem",
    margin: "1rem",
  },

  formatForm: {
    margin: "1rem",
  },

  colorButtons: {
    display: "flex",
    margin: "1rem",

    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
  },

  colorButton1: {
    color: "var(--color-white)",
    fontSize: "var(--font-size-small)",
    background: (gradient) => gradient.color1.hex,

    "&:hover": {
      background: (gradient) => gradient.color1.hex,
    },
  },

  colorButton2: {
    color: "var(--color-white)",
    fontSize: "var(--font-size-small)",
    background: (gradient) => gradient.color2.hex,

    "&:hover": {
      background: (gradient) => gradient.color2.hex,
    },
  },

  colorSelector: {
    position: "relative",
  },

  colorPicker: {
    position: "absolute",
    top: "3.5rem",
    left: "-50%",
    zIndex: "10",
  },
});

export default useStyles;
