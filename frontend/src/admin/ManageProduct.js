/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminApiCall";

const ManageProduct = () => {
  const { user, token } = isAuthenticate();

  const [product, setProduct] = useState();

  const preload = () => {
    getAllProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct(data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);

  //Delete Product

  const deleteThisProduct = productId => {
    deleteProduct(user._id, token, productId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  // manage Product UI
  const manageProduct = () => {
    return (
      <div>
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total products</h2>

            <div className="bg-light p-2 pt-3">
              {console.log(product)}
              {product &&
                product.map((product, index) => (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className=" font-weight-bold text-white text-dark text-left ml-2">
                        {product.name}
                      </h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      {manageProduct()}
    </Base>
  );
};
export default ManageProduct;
