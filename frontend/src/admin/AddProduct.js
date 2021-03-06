/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, createProduct } from "./helper/adminApiCall";
import { isAuthenticate } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "Select",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    category,
    createdProduct,
    formData
  } = values;

  const preload = () => {
    getAllCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  //Go Back
  const goBack = () => {
    return (
      <div className="m-3 mt-5">
        <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">
          {"Admin Dashboard"}
        </Link>
      </div>
    );
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        className=" container alert alert-success m-2"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} Created Successfully.
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
  const loadingMessage = () => {
    return (
      <div
        className=" container alert alert-infor m-2"
        style={{ display: loading ? "" : "none" }}
      >
        Loading...
      </div>
    );
  };

  //Form
  const createProductForm = () => (
    <div className="d-flex justify-content-center">
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              required
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            required
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            required
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            required
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
            required
          >
            <option>{category}</option>
            {categories &&
              categories.map((cate, index) => {
                return (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            required
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Create Product
        </button>
      </form>
    </div>
  );

  return (
    <Base
      title="Create Product"
      description="Add a new T-Shirt"
      className="container  p-4"
    >
      {goBack()}
      <div className="row bg-white rounded m-2">
        <div className="col-md-8 offset-md-2 my-4">
          {successMessage()}
          {errorMessage()}
          {loadingMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};
export default AddProduct;
