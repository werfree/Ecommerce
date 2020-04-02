/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getProduct,
  updateProduct
} from "./helper/adminApiCall";
import { isAuthenticate } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
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
    loading,
    error,
    createdProduct,
    formData
  } = values;

  var categories = [];

  const preload = productId => {
    getAllCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        window.categories = data;
      }
    });
    getProduct(productId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
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

    updateProduct(user._id, token, match.params.productId, formData).then(
      data => {
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
      }
    );
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
        {createdProduct} Updated Successfully.
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
            <option>Select</option>

            {window.categories &&
              window.categories.map((cate, index) => {
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
          Update Product
        </button>
      </form>
    </div>
  );

  return (
    <Base
      title="Update Product"
      description="Update your product"
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
export default UpdateProduct;
