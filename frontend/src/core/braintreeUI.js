/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState } from "react";
import { loadCart, carEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "./payment/braintree";
import { createrOrder, order } from "./helper/orderHelper";
import { isAuthenticate } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";
import { useEffect } from "react";

const BraintreeUI = (
  products,
  setRelode = f => f, //
  relode = undefined
) => {
  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const [info, set_info] = useState({
    loading: false,
    succes: false,
    clientToken: null,
    error: false,
    instance: {}
  });

  const [amount, set_amount] = useState(0);

  const getMeToken = async (userId, token) => {
    await getToken(userId, token).then(info => {
      if (info.error) {
        set_info({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        set_info({ clientToken });
      }
    });
  };

  const showdropIn = () => {
    return (
      <div>
        {info.clientToken !== null ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : isAuthenticate() ? (
          <div className="lead">Loading ...</div>
        ) : (
          <div>Please Log In</div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getMeToken(userId, token);
    getAmount();
  }, []);

  const onPurchase = () => {
    set_info({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };

      processPayment(userId, token, paymentData)
        .then(res => {
          set_info({ ...info, succes: res.succes });
          console.log("success", res);
          const orderData = {
            products: products,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount
          };

          carEmpty(() => {
            return;
          });
          order();
          createrOrder(userId, token, orderData).then(console.log(res));
          window.location.reload(false);
        })
        .catch(set_info({ loading: false, succes: false }));
    });
  };

  const getAmount = () => {
    let amt = 0;
    let pro = products.products;
    {
      pro.map((product, index) => {
        amt += product.price;
      });
    }

    return amt;
  };

  return (
    <div>
      <h1>Rs. {getAmount()}</h1>
      {showdropIn()}
    </div>
  );
};
export default BraintreeUI;
