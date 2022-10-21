import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "720px",
  },
  actionContainer: {
    marginTop: "2rem",
    padding: "1rem",
    boxShadow: `0px 0px 5px ${theme.palette.secondary.dark}`,
  },
  header: {
    margin: "2rem 3rem",
  },
  textField: {
    margin: "1rem 0rem",
  },
  successAccountMessage: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    padding: "1rem",
  },
}));

export default useStyles;
