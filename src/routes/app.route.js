import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as screens from "../pages";

const AppRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={screens.OnBoarding} />
      <Route exact path="/form-template" component={screens.FormTemplate} />
    </Switch>
  </Router>
);

export default AppRoute;
