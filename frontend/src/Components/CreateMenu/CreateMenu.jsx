import React from "react";
import "./menu.scss";

const CreateMenu = ({ onCreateShoppingList }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const shoppingListName = e.target.name.value;
    onCreateShoppingList(shoppingListName);
  };

  return (
    <div className="create_menu_container">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter name</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMenu;
