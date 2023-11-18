import React from "react";
import "./shopping.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import Groceries from "../../Products/Groceries/Groceries";
import HouseholdItems from "../../Products/Household/Household";
import Technique from "../../Products/Technique/Technique";
import Apparel from "../../Products/Apparel/Apparel";
import Footwear from "../../Products/Footwear/Footwear";
import Other from "../../Products/Other/Other";

const ShoppingList = () => {
  return (
    <div className="shopping_list_container">
      <nav>
        <ul>
          <li>
            <NavLink to="/shopping-list/groceries" activeclassname="active">
              Groceries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shopping-list/household-items"
              activeclassname="active"
            >
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

      <Routes>
        <Route path="groceries" element={<Groceries />} />
        <Route path="household-items" element={<HouseholdItems />} />
        <Route path="technique" element={<Technique />} />
        <Route path="apparel" element={<Apparel />} />
        <Route path="footwear" element={<Footwear />} />
        <Route path="other" element={<Other />} />
      </Routes>
    </div>
  );
};

export default ShoppingList;
