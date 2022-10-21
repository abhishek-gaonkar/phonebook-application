import React from "react";
import { Box, Typography, AppBar } from "@material-ui/core";
import useStyles from "./Footer.Styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <Box mt={5}>
      <AppBar position="fixed" className={classes.root}>
        <Box m={1} textAlign="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className={classes.footerBox}
          >
            <Typography variant="caption">
              Developer: Me, Email:{" "}
              <a href="mailto::developer@company.com">
                developer@company.com
              </a>
            </Typography>
            <Typography variant="caption">2022 &copy; Company</Typography>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Footer;
