import React, { useState } from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import CreateMenu from "../../Components/CreateMenu/CreateMenu";
import NewShoppingList from "../../Components/NewShoppingList/NewShoppingList";

const Layout = () => {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const [shoppingListName, setShoppingListName] = useState([]);

  const toggleCreateMenu = () => {
    setCreateMenuVisible((prev) => !prev);
  };

  const handleCreateShoppingList = (name) => {
    setShoppingListName((prevNames) => [...prevNames, name]);
    toggleCreateMenu();
  };

  return (
    <div className="layout_container">
      <header className="layout_container_header">
        <nav>
          <ul>
            <li>
              <Link to="/shopping-list">Default Shopping List</Link>
            </li>
          </ul>
          <button onClick={toggleCreateMenu}>Create New Shopping List</button>

          {shoppingListName.map((shoppingListName, index) => (
            <ul key={index}>
              <li>
                <Link to="/new-shopping-list">{shoppingListName}</Link>
              </li>
            </ul>
          ))}
          <ul>
            <li className="analytics">
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>
      </header>
      {createMenuVisible && (
        <CreateMenu
          shoppingListName={shoppingListName}
          onCreateShoppingList={handleCreateShoppingList}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/new-shopping-list" element={<NewShoppingList />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default Layout;
