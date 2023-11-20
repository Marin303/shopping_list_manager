import React, { useState } from "react";
import "./menu.scss";

const CreateMenu = ({ onCreateShoppingList, toggleCreateMenu }) => {
  const [showError, setShowError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const shoppingListName = e.target.name.value;
    if (!shoppingListName.trim()) {
      setShowError(true);
      return;
    }
    onCreateShoppingList(shoppingListName);
  };

  // when user start typing error message disappear
  const handleValueChange = () => {
    setShowError(false);
  };

  return (
    <div className="create_menu_container">
      {showError && (
        <div className="errorMsg">
          <p>Name cannot be empty</p>
        </div>
      )}
      <form action="" onSubmit={handleSubmit} id="createMenuForm">
        <div className="title">
          <label htmlFor="nameInput">Enter name:</label>
          <button onClick={toggleCreateMenu} type="button">
            X
          </button>
        </div>
        <input
          type="text"
          id="nameInput"
          name="name"
          onChange={handleValueChange}
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMenu;
