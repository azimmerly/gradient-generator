import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  copySection: {
    padding: "1rem",
    color: "var(--color-white)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  copyText: {
    color: "var(--color-white)",
    fontFamily: "var(--font-primary)",
    fontSize: "var(--font-size-medium)",
    fontWeight: "300",
    marginBottom: "1.2rem",
  },

  copyButton: {
    fontSize: "var(--font-size-small)",
  },

  copyIcon: {
    fontSize: "1.1rem",
    marginLeft: "0.5rem",
  },
});

export default useStyles;
