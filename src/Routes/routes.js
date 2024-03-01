import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import React, { lazy, Fragment } from "react";
import Signin from "../layout/authentication/sign-In";
import Home from "../masterForms/";
import MissingRoute from "./MissingRoute";

const RouteComponent = (match) => {
  const location = useLocation();

  if (location && location.pathname === "/") {
    return <Navigate to="/signin" />;
  }
  let token = localStorage.getItem("token");
  return (
    <Fragment>
      <React.Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="*" element={<MissingRoute />}></Route>
          <Route>
            {token ? <Route path="/home" element={<Home />} /> : ""}
          </Route>
        </Switch>
      </React.Suspense>
    </Fragment>
  );
};

export default RouteComponent;
