import React from "react";
import API from "../../Assets/api/Api";
import "./other.scss";

const Other = () => {
  return (
    <div className="other_container">
      <h4>Other</h4>
      <API category="Other" />
    </div>
  );
};
export default Other;