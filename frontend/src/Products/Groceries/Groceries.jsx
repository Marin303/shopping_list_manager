import React from "react";
import "./groceries.scss";
import API from "../../Assets/api/Api";

const Groceries = () => {
  return (
    <div className="groceries_container">
      <h4>Groceries</h4>
      <API category="Groceries" />
    </div>
  );
};

export default Groceries;
