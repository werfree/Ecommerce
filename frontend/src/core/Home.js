/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState, useEffect } from "react";

//import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getHomeProducts } from "./helper/coreApiCall";

const Home = () => {
  const [products, set_products] = useState([]);
  const [error, set_error] = useState(false);
  const loadAllProducts = () => {
    getHomeProducts().then(data => {
      if (data.error) {
        set_error(data.error);
      } else {
        set_products(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="Home">
      <h1 className="text-white">All of tshirt</h1>
      <div className="row text-center ">
        {products &&
          products.map((product, index) => {
            return (
              <div key={index} className="col m-3">
                <Card product={product} />
              </div>
            );
          })}
      </div>
    </Base>
  );
};
export default Home;
