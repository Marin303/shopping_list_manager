import React, { useState } from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import { Route, Routes, Navigate, Link, NavLink } from "react-router-dom";
import CreateMenu from "../../Components/CreateMenu/CreateMenu";
import NewShoppingList from "../../Components/NewShoppingList/NewShoppingList";

const Layout = () => {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const [shoppingListName, setShoppingListName] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  window.onload = () => {
    const storedShoppingList =
      JSON.parse(localStorage.getItem("shoppingListName")) || [];
    setShoppingListName(storedShoppingList);
  };

  const toggleCreateMenu = () => {
    setCreateMenuVisible((prev) => !prev);
  };

  const handleCreateShoppingList = (name) => {
    setShoppingListName((prevNames) => {
      const updatedNames = [...prevNames, name];
      localStorage.setItem("shoppingListName", JSON.stringify(updatedNames));
      return updatedNames;
    });
    toggleCreateMenu();
  };
  
  const handleEditShoppingList = (index) => {
    setEditingIndex(index);
    setNewName(shoppingListName[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewName("");
  };

  const handleSaveEdit = (index) => {
    setShoppingListName((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      localStorage.setItem("shoppingListName", JSON.stringify(updatedNames));
      return updatedNames;
    });
    setEditingIndex(null);
  };
  

  const handleDeleteShoppingList = (index) => {
    setShoppingListName((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      localStorage.setItem("shoppingListName", JSON.stringify(updatedNames));
      return updatedNames;
    });
  };
  return (
    <div className="layout_container">
      <header className="layout_container_header">
        <nav>
          <ul>
            <li>
              <NavLink to="/shopping-list" activeclassname="active">
                Default Shopping List
              </NavLink>
            </li>
          </ul>
          <button onClick={toggleCreateMenu}>Create New Shopping List</button>

          {shoppingListName.map((name, index) => (
            <ul key={index}>
              <li>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <Link to={`/new-shopping-list-${name}`}>{name}</Link>
                    <button onClick={() => handleEditShoppingList(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteShoppingList(index)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            </ul>
          ))}
          <ul>
            <li className="analytics">
              <NavLink to="/analytics" activeclassname="active">
                Analytics
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {createMenuVisible && (
        <CreateMenu
          shoppingListName={shoppingListName}
          onCreateShoppingList={handleCreateShoppingList}
          toggleCreateMenu={toggleCreateMenu}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/shopping-list" />} />
        {shoppingListName.map((name, index) => (
          <Route
            key={index}
            path={`/new-shopping-list-${name}`}
            element={<NewShoppingList listName={name} />}
          />
        ))}
        <Route path="/shopping-list//*" element={<ShoppingList />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default Layout;
