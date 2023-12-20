import React, { useEffect, useRef, useState } from "react";
import "./shoppingList.scss";
import { Routes, Route } from "react-router-dom";
import Groceries from "../../Products/Groceries/Groceries";
import HouseholdItems from "../../Products/Household/Household";
import Technique from "../../Products/Technique/Technique";
import Apparel from "../../Products/Apparel/Apparel";
import Footwear from "../../Products/Footwear/Footwear";
import Other from "../../Products/Other/Other";
import ShoppingNavbar from "../ShoppingNavbar/ShoppingNavbar";

const ShoppingList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const toggleMenu = () => {
    clearTimeout(clickTimeoutRef.current);
    setMenuOpen((prev) => !prev);
  };
  const handleClickOutside = (e) => {
    const isClickOutside =
      dropdownRef.current && !dropdownRef.current.contains(e.target);
    if (isClickOutside) {
      // Small delay to allow for a second click close dropdown
      clickTimeoutRef.current = setTimeout(() => {
        setMenuOpen(false);
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shopping_list_container">
      <button className="menu_button" onClick={toggleMenu} aria-label="toggle menu">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ShoppingNavbar isLargeScreen={!menuOpen} />
      <div
        className={`dropdown-menu ${menuOpen ? "" : "hidden"}`}
        ref={dropdownRef}
      ></div>
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
