import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Footer } from "../components";
import { APP_ROUTES } from "../config/app";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import EditContactPage from "./EditContactPage";

const Pages = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={APP_ROUTES.HOME_PAGE.path} component={HomePage} />
        <Route exact path={APP_ROUTES.LOGIN_PAGE.path} component={LoginPage} />
        <Route
          exact
          path={`${APP_ROUTES.EDIT_CONTACT_PAGE.path}/:cPhone`}
          component={EditContactPage}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Pages;
