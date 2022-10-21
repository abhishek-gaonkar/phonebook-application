import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `0px 0px 2px ${theme.palette.secondary.dark}`,
    margin: "1rem",
    padding: "1rem",
    borderRadius: "12px",
  },
  contactBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contactIcon: {
    fontSize: "150px",
  },
  itemIcon: {
    fontSize: "50px",
  },
  contactInnerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export default useStyles;
