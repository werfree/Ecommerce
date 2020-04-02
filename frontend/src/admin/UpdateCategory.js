/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminApiCall";

const UpdateCategory = ({ match }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [value, setValue] = useState({
    _id: match.params.categoryId,
    name: ""
  });

  const { _id, name } = value;

  const { user, token } = isAuthenticate();

  const goBack = () => {
    return (
      <div className="m-3 mt-5">
        <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">
          {"Admin Dashboard"}
        </Link>
      </div>
    );
  };

  const preload = categoryId => {
    getCategory(categoryId).then(res => {
      setValue({
        ...value,
        _id: res._id,
        name: res.name
      });
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = event => {
    setError("");
    setValue({
      ...value,
      name: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(user._id, token, match.params.categoryId, value).then(
      data => {
        if (data.err) {
          if ((data.err.code = 11000)) {
            setError("Category Already Present");
          } else {
            setError("Category not created");
            console.log(`${error}`);
          }
        } else {
          setError("");
          setValue({
            ...value,
            name: ""
          });
          setSuccess(true);
        }
      }
    );
  };

  const successMessage = () => {
    return (
      <div
        className=" container alert alert-success m-2"
        style={{ display: success ? "" : "none" }}
      >
        Category Updated Successfully.
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className=" container alert alert-danger m-2"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const UpdateCategoryForm = () => {
    return (
      <form action="" className="m-3">
        <div className="form-group">
          <p className="lead">Enter Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
        </div>
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </form>
    );
  };
  return (
    <Base
      title="Create Category"
      description="Add a new category for T-Shirt"
      className="container p-4"
    >
      {goBack()}
      <div className="row bg-white rounded m-2">
        <div className="col-md-9 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {UpdateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
