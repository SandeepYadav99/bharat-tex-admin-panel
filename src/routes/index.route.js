import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
import LoginOTPView from "../views/LoginOTP/LoginOTP.view.js";

import { Route, Switch } from "react-router-dom";
import PollResult from "../views/PollResults/PollResult.js";

const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={"/other"} component={LoginOTPView} />
    <Route path={"/pollresults"} component={PollResult} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
