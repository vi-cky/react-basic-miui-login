import { Route, Routes as Switch } from "react-router-dom";
import React, { lazy, Fragment } from "react";
import Signin from "../layout/authentication/sign-In";
const LMSForm = lazy(() => import("../masterForms/lms"));

const RouteComponent = (match) => {
  return (
    <Fragment>
      <React.Suspense fallback={<div></div>}>
        <Switch>
        <Route path="/signin" element={<Signin />}></Route>
          <Route>
            <Route path="/" element={<LMSForm />} />
          </Route>
        </Switch>
      </React.Suspense>
    </Fragment>
  );
};

export default RouteComponent;
