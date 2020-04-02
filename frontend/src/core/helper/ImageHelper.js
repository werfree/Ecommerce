/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React, { useState } from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}product/photo/${product._id}`
    : "https://werfree.github.io/static/media/myPic.f7ff53fd.jpg";
  return (
    <div className="rounded card-image-top border border-success p-3">
      <img
        src={imageURL}
        alt="photo"
        style={{ width: "18rem", height: "12rem" }}
        className="mb-3 card-img-top rounded"
      />
    </div>
  );
};
export default ImageHelper;
