import React, { useState } from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import { Route, Routes, Navigate, NavLink, useNavigate } from "react-router-dom";
import CreateMenu from "../../Components/CreateMenu/CreateMenu";
import NewShoppingList from "../../Components/NewShoppingList/NewShoppingList";

const Layout = () => {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const [shoppingListName, setShoppingListName] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");
  
  const navigate = useNavigate()
  // fetch localStorage array -- keeping track of new created list
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
/* 
    setNewShoppingLists((prevLists) => ({
      ...prevLists,
      [name]: [
        {
          name: "",
          checked: false,
          quantity: 1,
          price: 0,
        },
      ],
    }));

    toggleCreateMenu(); */
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
      navigate("/")
      return updatedNames;
    });
  };
  return (
    <div className="layout_container">
      <header className="layout_container_header">
        <nav>
          <ul>
            <li>
              <NavLink to="/shopping-list/groceries" activeclassname="active">
                Default Shopping List
              </NavLink>
            </li>
          </ul>
          <button onClick={toggleCreateMenu} className="create-shopping-list">
            Create New Shopping List
          </button>

          {shoppingListName.map((name, index) => (
            <ul key={index} className="shopping-list">
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
                    <NavLink to={`/new-shopping-list-${name}`}>{name}</NavLink>
                    <div className="save-edit-wrapper">
                      <button onClick={() => handleEditShoppingList(index)}>
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteShoppingList(index)}
                      >
                        Delete
                      </button>
                    </div>
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
        <Route path="/" element={<Navigate to="/shopping-list/groceries" />} />
        {shoppingListName.map((name, index) => (
          <Route
            key={index}
            path={`/new-shopping-list-${name}`}
            element={
              <NewShoppingList
                listName={name}
              />
            }
          />
        ))}
        <Route path="/shopping-list//*" element={<ShoppingList />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* <Route path="/new-shopping-list//*" element={<NewShoppingList />} /> -- No routes matched location "new-shopping-lits-NAME"*/}
      </Routes>
    </div>
  );
};

export default Layout;
