import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  errorMessageBox: {
    padding: "1rem",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "fit-content",
  },
  textField: {
    margin: "1rem 0rem",
  },
  editFormBox: {
    marginTop: "2rem",
    boxShadow: `0px 0px 5px ${theme.palette.secondary.dark}`,
    padding: "1rem",
  },
}));

export default useStyles;
