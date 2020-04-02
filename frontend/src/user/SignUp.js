/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { name, email, password, error, success } = values;

  const onSubmit = event => {
    console.log("Submit");
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          if (data.errcode === 11000) {
            setValues({
              ...values,
              error: "Email Already present",
              success: false
            });
          } else {
            setValues({ ...values, error: data.errcode, success: false });
          }
        } else {
          console.log("Success");
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err => console.log(err));
  };

  const successMessage = () => (
    <div
      className=" container alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Account Created Successfully. Please <Link to="/signin">Login Here.</Link>
    </div>
  );
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
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
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
    <Base title="Sign Up" description="A page for user to SignUp">
      {errorMessage()}
      {successMessage()}
      {signupForm()}
    </Base>
  );
};
export default Signup;
