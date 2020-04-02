/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import BraintreeUI from "./braintreeUI";
const Cart = () => {
  const [products, set_products] = useState([]);

  const [relode, set_relode] = useState(false);

  const loadAllProducts = products => {
    return (
      <div>
        <h2 className="mb-5">Load Product</h2>
        {products &&
          products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setRelode={set_relode}
                relode={relode}
              />
            );
          })}
      </div>
    );
  };
  const checkoutProduct = () => {
    return (
      <BraintreeUI products={products} setRelode={set_relode} relode={relode} />
    );
  };

  useEffect(() => {
    set_products(loadCart());
  }, [relode]);

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      {products.length > 0 && (
        <div className="row text-center ">
          <div className="col">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3>No Product in Cart</h3>
            )}
          </div>
          <div className="col">{checkoutProduct()}</div>
        </div>
      )}
      {products.length === 0 && (
        <div className="d-flex display-4 text-danger mt-5 pt-5 align-middle justify-content-center">
          Cart is Empty
        </div>
      )}
    </Base>
  );
};
export default Cart;
