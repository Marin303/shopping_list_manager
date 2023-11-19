import React from "react";
import API from "../../Assets/api/Api";
import "./apparel.scss";

const Apparel = () => {
  return (
    <div className="apparel_container">
      <h4>Apparel</h4>
      <API category="Apparel" />
    </div>
  );
};

export default Apparel;
