import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  errorRoot: {
    minHeight: "320px",
  },
  headingBox: {
    padding: "1rem 0rem",
    borderBottom: `2px solid ${theme.palette.secondary.dark}`,
  },
  createContactDrawer: {
    width: "600px",
    backgroundColor: theme.palette.primary.light,
    height: "100%",
  },
  createContactDrawerInnerBox: {
    width: "520px",
  },
  textField: {
    margin: "1rem 0rem",
  },
  errorMessageBox: {
    padding: "1rem",
    width: "fit-content",
    borderRadius: "12px",
  },
}));

export default useStyles;
