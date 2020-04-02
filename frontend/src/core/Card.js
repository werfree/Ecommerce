/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect, withRouter } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  history,
  setRelode = f => f, // same as function (f) return f;
  relode = undefined
}) => {
  const [redirect, set_redirect] = useState(false);

  const [count, set_count] = useState(product.count);

  const cardTitle = product ? product.name : "My Photo";
  const cardDescription = product ? product.description : "My Fav";
  const cardPrice = product ? product.price : "0";

  const getRedirect = redirect => {
    return redirect && history.push("/cart");
  };

  const addToCart = () => {
    console.log(product.name);
    addItemToCart(product, () => {
      set_redirect(true);
    });
    getRedirect(true);
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setRelode(!relode);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card mb-5 text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">Rs {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
