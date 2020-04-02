/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { isAuthenticate, signin, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    isLoading: false,
    didRedirect: false
  });

  const { user } = isAuthenticate();

  const { email, password, error, isLoading, didRedirect } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      isLoading: true
    });
    signin({ email, password })
      .then(user => {
        console.log(user);
        if (user.error) {
          setValues({
            ...values,
            error: user.error,
            isLoading: false
          });
        } else {
          authenticate(user, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(err => console.log(err));
  };

  const redirect = () => {
    console.log(isAuthenticate());
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin</p>;
      } else {
        return <p>Redirect to user</p>;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/"></Redirect>;
    }
  };

  const loadingMessage = () => {
    return (
      isLoading && (
        <div className="alert alert-info">
          <h2>Loading..</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="container alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn rounded btn-success btn-block mt-5 mb-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign in" description="A page for user to SignIn">
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {redirect()}{" "}
    </Base>
  );
};
export default Signin;
