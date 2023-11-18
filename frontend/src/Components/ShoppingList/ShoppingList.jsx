import React, { useEffect, useRef, useState } from "react";
import "./shopping.scss";
import { Routes, Route } from "react-router-dom";
import Groceries from "../../Products/Groceries/Groceries";
import HouseholdItems from "../../Products/Household/Household";
import Technique from "../../Products/Technique/Technique";
import Apparel from "../../Products/Apparel/Apparel";
import Footwear from "../../Products/Footwear/Footwear";
import Other from "../../Products/Other/Other";
import ShoppingNavbar from "../ShoppingNavbar/ShoppingNavbar";
import ShoppingNavDropdown from "../ShoppingNavDropdown/ShoppingNavDropdown";

const ShoppingList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shopping_list_container">
      <button className="menu_button" onClick={toggleMenu}>
        Menu
      </button>

      <ShoppingNavbar />

      <div className={`dropdown-menu ${menuOpen ? "visible" : "hidden"}`} ref={dropdownRef}>
        <ShoppingNavDropdown />
      </div>

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
