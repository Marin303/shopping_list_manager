import React from "react";
import "./shopping.scss";
import { Routes, Route, Link } from "react-router-dom";
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
            <Link to="/shopping-list/groceries">Groceries</Link>
          </li>
          <li>
            <Link to="/shopping-list/household-items">Household items</Link>
          </li>
          <li>
            <Link to="/shopping-list/technique">Technique</Link>
          </li>
          <li>
            <Link to="/shopping-list/apparel">Apparel</Link>
          </li>
          <li>
            <Link to="/shopping-list/footwear">Footwear</Link>
          </li>
          <li>
            <Link to="/shopping-list/other">Other</Link>
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
