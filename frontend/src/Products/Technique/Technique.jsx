import React from "react";
import API from "../../Assets/api/Api";
import "./technique.scss";

const Technique = () => {
  return (
    <div className="technique_container">
      <h4>Technique</h4>
      <API category="Technique" />
    </div>
  );
};

export default Technique