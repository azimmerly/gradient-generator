import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  waveSVG: {
    position: "absolute",
    top: "-1px",
    width: "100vw",
  },

  wavePath: {
    fill: "var(--color-white)",
  },
});

export default useStyles;
