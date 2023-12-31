import React, { useEffect, useState } from "react";
import "./newshoppinglist.scss";
import axios from "axios";
import { useShoppingListFunction } from "../../Helpers/Handlers";

const NewShoppingList = ({ listName }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const {
    items,
    setItems,
    dateTime,
    setDateTime,
    handleDeleteItem,
    handleToggleCheckbox,
    handleProductName,
    handleQuantityChange,
    handlePriceChange,
    handleCategoryChange,
    calculateSum,
    calculateSumMoney,
  } = useShoppingListFunction({ listName });

  useEffect(() => {
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem(`shoppingListData_${listName}`)) || {};
    const savedItems = dataFromLocalStorage.items || {};
    setItems(savedItems.length > 0 ? savedItems : [createNewItem()]);
  }, [listName, setItems]);

  useEffect(() => {
    localStorage.setItem(
      `shoppingListData_${listName}`,
      JSON.stringify({ items })
    );
  }, [items, listName]);

  const createNewItem = () => ({
    name: "",
    checked: false,
    quantity: "",
    price: "",
    category: "",
  });

  const handleAddItem = () => {
    setItems([...items, createNewItem()]);
  };

  const handleDoneButton = async () => {
    const allValid = items.every(
      (item) =>
        item.checked &&
        item.name &&
        item.quantity &&
        item.price &&
        item.category
    );

    if (allValid) {
      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.toLocaleDateString()}`;
      setDateTime(formattedDateTime);
      setErrorMsg(false);

      // send to the backend
      const dataToSend = {
        items,
        dateTime: formattedDateTime,
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_PRODUCTS_KEY,
          dataToSend
        );
        if (response.status === 201) {
          console.log("Data sent successfully");
        } else {
          console.error("Failed to send data");
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <div className="new_list_container">
      <h4 className="header_title">Create shopping list - {listName}</h4>
      {items?.map((item, index) => (
        <form
          id={`list-item-${index}`}
          key={index}
          className="form-items"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="list-item"
            id="list-item"
            className="list-item-input"
            placeholder="enter product name"
            value={item.name}
            onChange={(e) => handleProductName(index, "name", e.target.value)}
            disabled={item.checked}
          />
          <input
            name="checkbox" //violating node rule
            type="checkbox"
            className="list-item-checkbox"
            checked={item.checked}
            onChange={() => handleToggleCheckbox(index)}
          />
          <input
            type="number"
            name="quantity"
            className="inputNum"
            placeholder="amount"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, e)}
            disabled={item.checked}
          />
          <div className="input-with-euro">
            <input
              type="text"
              name="price"
              className="inputMoneyCount"
              placeholder="price"
              value={item.price}
              onChange={(e) => handlePriceChange(index, e)}
              disabled={item.checked}
              step="0.01"
            />
            <span className="euro-symbol">€</span>
          </div>

          <select
            name="category"
            id={`category-${index}`}
            value={item.category}
            onChange={(e) => handleCategoryChange(index, e)}
            required
          >
            <option value="">Select a category</option>
            <option value="Footwear">Footwear</option>
            <option value="Apparel">Apparel</option>
            <option value="Groceries">Groceries</option>
            <option value="Household">Household</option>
            <option value="Technique">Technique</option>
            <option value="Other">Other</option>
          </select>
          <div className="items-change-wrapper">
            <button
              onClick={() => handleAddItem()}
              type="button"
              aria-label="add-button"
            >
              ADD
            </button>
            <button
              onClick={() => handleDeleteItem(index)}
              type="button"
              aria-label="delete-button"
            >
              DELETE
            </button>
          </div>
        </form>
      ))}
      {errorMsg && <p>Please fill required fields or delete items</p>}
      <div className="sum">
        <p>ITEMS IN CHART: {calculateSum()}</p>
        <p>SUM {calculateSumMoney()}€</p>
        <p>DATE: {dateTime} </p>
        <button
          type="submit"
          onClick={handleDoneButton}
          aria-label="done button"
        >
          DONE
        </button>
      </div>
    </div>
  );
};
export default NewShoppingList;
