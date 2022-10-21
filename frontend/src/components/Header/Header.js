import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { useHistory } from "react-router-dom";
import useStyles from "./Header.Styles";
import { COMPANY_RELATED } from "../../config/app";
import AuthContext from "../../context/AuthContext";
import { APP_ROUTES } from "../../config/app";

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isUserLoggedIn, userName } = useContext(AuthContext);

  const handleLoginBtnClick = () => {
    history.push(APP_ROUTES.LOGIN_PAGE.path);
  };

  const handleLogoutBtnClick = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="sticky" className={classes.appNavBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <img
              src={COMPANY_RELATED.LOGO}
              alt=""
              className={classes.appBarLogo}
            />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <ContactPhoneIcon className={classes.appBarLogo} />
              <Box ml={2}>
                <Typography variant="h5">{COMPANY_RELATED.PROJECT}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box mt={1} textAlign="right">
              {isUserLoggedIn ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Box mx={2}>
                    <Typography variant="h6">Hi, {userName}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogoutBtnClick}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLoginBtnClick}
                >
                  Login
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
