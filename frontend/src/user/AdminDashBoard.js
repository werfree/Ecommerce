/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email }
  } = isAuthenticate();

  const adminBottom = () => {
    return (
      <div className="card my-5">
        <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
        <ul className="list-group">
          <li className="list-group-item bg-light">
            <Link
              to="/admin/create/category"
              className="nave-link text-success"
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item bg-light">
            <Link to="/admin/categories" className="nave-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-light">
            <Link to="/admin/create/product" className="nave-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item bg-light">
            <Link to="/admin/products" className="nave-link text-success">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item bg-light">
            <Link to="/admin/orders" className="nave-link text-success">
              Manage Order
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminTop = () => {
    return (
      <div className="card mt-5 ">
        <h4 className="card-header bg-dark text-white">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item bg-light">
            <span className="badge badge-success mr-2 p-2">Name:</span>
            <span className="text-primary">{name}</span>
          </li>
          <li className="list-group-item bg-light">
            <span className="badge badge-success mr-2 p-2">Email:</span>
            <span className="text-primary">{email}</span>
          </li>
          <li className="list-group-item bg-light">
            <span className="badge badge-danger mr-2 p-2">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Admin Area"
      description="Manage all of your product here"
      className=" my-5"
    >
      {adminTop()}
      {adminBottom()}
    </Base>
  );
};
export default AdminDashBoard;
