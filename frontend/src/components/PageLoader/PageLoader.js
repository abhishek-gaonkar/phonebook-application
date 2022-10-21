import React, { Fragment } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import useStyles from "./PageLoader.Styles";

const PageLoader = ({ display = false }) => {
  const classes = useStyles();

  if (display) {
    return (
      <Box>
        <LinearProgress color="secondary" className={classes.progressBar} />
      </Box>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default PageLoader;
