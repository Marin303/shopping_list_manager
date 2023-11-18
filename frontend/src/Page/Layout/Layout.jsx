import React from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import { Route, Routes, Navigate } from "react-router-dom";

const Layout = () => {
  
  return (
    <div className="layout_container">
      <header className="layout_container_header">
        <Routes>
          <Route path="/" element={<Navigate to="/shopping-list" />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </header>
    </div>
  );
};

export default Layout;
