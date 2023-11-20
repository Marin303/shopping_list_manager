import React from "react";
import API from "../../Assets/api/Api";
import "./footwear.scss";

const Footwear = () => {
  return (
    <div className="footwear_container">
      <h4>Footwear</h4>
      <API category="Footwear" />
    </div>
  );
};

export default Footwear