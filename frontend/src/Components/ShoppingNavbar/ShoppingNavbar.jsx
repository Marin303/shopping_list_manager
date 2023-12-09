import React from "react";
import { NavLink } from "react-router-dom";
import "./shopping.scss";

const ShoppingNavbar = ({ isLargeScreen }) => {
  const navbarClassScreen = isLargeScreen
    ? "shopping_navbar"
    : "shopping_navbar_dropdown";

  return (
    <nav className={navbarClassScreen}>
      <ul>
        <li>
          <NavLink to="/shopping-list/groceries" activeclassname="active">
            Groceries
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/household-items" activeclassname="active">
            Household
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/technique" activeclassname="active">
            Technique
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/apparel" activeclassname="active">
            Apparel
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/footwear" activeclassname="active">
            Footwear
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping-list/other" activeclassname="active">
            Other
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ShoppingNavbar;
