import React from "react";
import "./menu.scss";

const CreateMenu = ({ onCreateShoppingList, toggleCreateMenu }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const shoppingListName = e.target.name.value;
    onCreateShoppingList(shoppingListName);
  };

  return (
    <div className="create_menu_container">
      <form action="" onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="name">Enter name:</label>
          <button onClick={toggleCreateMenu}>X</button>
        </div>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMenu;
