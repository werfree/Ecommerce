/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { signout, isAuthenticate } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  }
  return { color: "#FFFFFF" };
};
const Menu = ({ history }) => {
  return (
    <Navbar className="bg-dark" bg="dark" expand="lg">
      <Navbar.Brand className="text-white font-weight-bold" href="#home">
        <h4>{"</ My-Tees >"}</h4>
      </Navbar.Brand>
      <Navbar.Toggle className="nav border" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav margin">
        <Nav className="mr-auto">
          <ul className="navbar-nav mr-auto bg-dark ">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticate() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticate() && (
              <li
                style={currentTab(history, "/admin/dashboard")}
                className="nav-item"
              >
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  A.Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticate() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {!isAuthenticate() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            )}
            {isAuthenticate() && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning"
                  to=""
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </Link>
              </li>
            )}
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(Menu);
