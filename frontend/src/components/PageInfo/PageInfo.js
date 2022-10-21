import React, { Fragment } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./PageInfo.Styles";

const PageInfo = ({
  display = false,
  infoMessage = "Something went Wrong",
  handleClose = () => {},
  severity = "success",
}) => {
  const classes = useStyles();

  if (display) {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={display}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.errorBar}
      >
        <MuiAlert
          variant="filled"
          elevation={6}
          onClose={handleClose}
          severity={severity}
        >
          {infoMessage}
        </MuiAlert>
      </Snackbar>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default PageInfo;
