import React, { useCallback, useEffect, useState } from "react";
import ShoppingList from "../../Components/ShoppingList/ShoppingList";
import Analytics from "../../Components/Analytics/Analytics";
import "./layout.scss";
import {
  Route,
  Routes,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";
import CreateMenu from "../../Components/CreateMenu/CreateMenu";
import NewShoppingList from "../../Components/NewShoppingList/NewShoppingList";

// declared outside - I need it only once when component loads
const storedShoppingList =
  JSON.parse(localStorage.getItem("shoppingListName")) || [];

const updateLocalStorage = (updatedNames) => {
  localStorage.setItem("shoppingListName", JSON.stringify(updatedNames));
};

const Layout = () => {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [shoppingListName, setShoppingListName] = useState(storedShoppingList);
  const [closeHeader, setCloseHeader] = useState(true);

  const [openHeader, setOpenHeader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShoppingListName(storedShoppingList);
  }, []);

  const toggleCreateMenu = () => {
    setCreateMenuVisible((prev) => !prev);
  };

  const handleCreateShoppingList = (name) => {
    setShoppingListName((prevNames) => {
      const updatedNames = [...prevNames, name];
      updateLocalStorage(updatedNames);
      return updatedNames;
    });
    navigate(`/new-shopping-list/${name}`);
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
      updateLocalStorage(updatedNames);
      return updatedNames;
    });
    setEditingIndex(null);
  };

  const handleDeleteShoppingList = (index) => {
    setShoppingListName((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      updateLocalStorage(updatedNames);
      return updatedNames;
    });
    navigate("/");
  };

  const toggleOpenHeader = () => {
    setCloseHeader((prev) => !prev);
    setOpenHeader((prev) => !prev);
  };
 
  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 764 ) {
      setCloseHeader(true);
      setOpenHeader(false) 
    }
  }, []);

  useEffect(() => {
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return (
    <div className="layout_container">
      {openHeader && (
        <button className="open_header" onClick={toggleOpenHeader}>
          <i className="fa-regular fa-eye"></i>
        </button>
      )}
      <header
        className={
          closeHeader ? "layout_container_header" : "header_display_none"
        }
      >
        <nav className="left-nav">
          <button className="close_header" onClick={toggleOpenHeader}>
            <i className="fa-regular fa-eye-slash"></i>
          </button>
          <ul>
            <li>
              <NavLink to="/shopping-list/groceries" activeclassname="active">
                My Shopping
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
      <div className="main_components">
        {createMenuVisible && (
          <CreateMenu
            shoppingListName={shoppingListName}
            onCreateShoppingList={handleCreateShoppingList}
            toggleCreateMenu={toggleCreateMenu}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/shopping-list/groceries" />}
          />
          {shoppingListName.map((name, index) => (
            <Route
              key={index}
              path={`/new-shopping-list-${name}`}
              element={<NewShoppingList listName={name} />}
            />
          ))}
          <Route path="/shopping-list//*" element={<ShoppingList />} />
          <Route path="/new-shopping-list//*" element={<ShoppingList />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
