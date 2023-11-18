import React from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import { Route, Routes, Navigate, Link } from "react-router-dom";

const Layout = () => {
  
  return (
    <div className="layout_container">
      <header className="layout_container_header">
        <nav>
          <ul>
            <li>
              <Link to="/shopping-list">Shopping List</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
          <Route path="/" element={<Navigate to="/"/>} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
    </div>
  );
};

export default Layout;
