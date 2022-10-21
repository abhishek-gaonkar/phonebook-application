import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appNavBar: {
    height: "auto",
    backgroundColor: theme.palette.primary.light,
  },
  compLogo: {
    width: "auto",
    height: "40px",
  },
  appBarLogo: {
    width: "auto",
    height: "50px",
  },
}));

export default useStyles;
