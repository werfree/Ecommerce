/*

    SAyantan GHosh{
        [Email: gsayantan01@gmail.com
        Github: www.https: //github.com/werfree
        ]

*/

import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white",
  children
}) => {
  return (
    <div>
      <div className="menu">
        <Menu />
      </div>
      <div className=" container-fluid body-containers">
        <div className="  bg-dark text-white text-center mt-auto">
          <h2 className="display-5 text-warning">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};
export default Base;
