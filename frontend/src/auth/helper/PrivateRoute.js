/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticate() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "../signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
