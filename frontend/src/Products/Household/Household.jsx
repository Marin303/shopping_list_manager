import React from "react";
import API from "../../Assets/api/Api";
import "./household.scss";

const Household = () => {
  return (
    <div className="household_container">
      <h4>Household</h4>
      <API category="Household" />
    </div>
  );
};

export default Household;
