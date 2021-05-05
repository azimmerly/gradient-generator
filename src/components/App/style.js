import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  headingPrimary: {
    color: "var(--color-black)",
    backgroundImage: (gradient) =>
      `linear-gradient(${gradient.direction}, ${gradient.color1.hex}, ${gradient.color2.hex})`,
    fontFamily: "var(--font-secondary)",
    fontSize: "var(--font-size-large)",
    fontWeight: "300",
    textAlign: "center",
  },

  headerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",

    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },

  colorSection: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "25rem",
    background: (gradient) =>
      `linear-gradient(
        ${gradient.direction},
        ${gradient.color1.hex},
        ${gradient.color2.hex})`,
    position: "relative",
  },
});

export default useStyles;
