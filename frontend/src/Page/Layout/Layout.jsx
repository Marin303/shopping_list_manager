import React from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
const Layout = () => {
  return (
    <div className="layout_container">
      <ShoppingList />
      <Analytics />
    </div>
  );
};

export default Layout;
