import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  errorBar: {
    backgroundColor: `${theme.palette.secondary.dark} !important`,
    color: "white",
  },
}));

export default useStyles;
