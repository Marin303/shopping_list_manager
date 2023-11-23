import React, { useState } from "react";
import "./newshoppinglist.scss";
import axios from "axios";

const NewShoppingList = ({ listName }) => {
  const [dateTime, setDateTime] = useState(null);
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [category] = useState("")
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        checked: false,
        quantity: "",
        price: "",
        category: "",
      },
    ]);
  };

  // generating oncreate/onload at least 1
  if (items.length === 0) {
    handleAddItem();
  }

  const handleDeleteItem = (index) => {
    if (items.length >= 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  //Lock input fields
  const handleToggleCheckbox = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  //Handle changes in the product name input
  const handleInputChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].name = e.target.value;
    setItems(updatedItems);
  };

  //Handle changes in the quantity input
  const handleQuantityChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(e.target.value) || 1;
    setItems(updatedItems);
  };

  //Handle changes in the price input
  const handlePriceChange = (index, e) => {
    const updatedItems = [...items];
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    updatedItems[index].price = newValue;
    setItems(updatedItems);
  };

  //Calculate the total number of items in the chart
  const calculateSum = () => {
    return items?.reduce(
      (sum, item) => (item.checked ? sum + item.quantity : sum),
      0
    );
  };

  // Calculate the total cost of items in the chart
  const calculateSumMoney = () => {
    return items?.reduce(
      (sum, item) => (item.checked ? sum + item.price * item.quantity : sum),
      0
    );
  };

  const handleDateTime = async () => {
    const allChecked = items.every((item) => item.checked);

    if (allChecked) {
      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.toLocaleDateString()}`;
      setDateTime(formattedDateTime);
      setErrorMsg(false);

      // send to the backend
      const dataToSend = {
        category,
        items,
        dateTime: formattedDateTime,
      };

      try {
        const response = await axios.post(
          "http://localhost:3001/api/products",
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

  const handleCategoryChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].category = e.target.value;
    setItems(updatedItems);
  };
  return (
    <div className="new_list_container">
      <h4 className="header_title">Create shopping list - {listName}</h4>
      {items.map((item, index) => (
        <form
          id={`list-item-${index}`}
          key={index}
          className="form-items"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name={`list-item-${index}`}
            id={`list-item-${index}`}
            className="list-item-input"
            placeholder="enter product name"
            value={item.name}
            onChange={(e) => handleInputChange(index, e)}
            disabled={item.checked}
          />
          <input
            type="checkbox"
            className="list-item-checkbox"
            checked={item.checked}
            onChange={() => handleToggleCheckbox(index)}
          />
          <input
            type="number"
            name={`quantity-${index}`}
            className="inputNum"
            placeholder="amount"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, e)}
            disabled={item.checked}
          />
          <div className="input-with-euro">
            <input
              type="text"
              name={`price-${index}`}
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
            defaultValue={category}
            onChange={(e) => handleCategoryChange(index, e)}
          >
            <option value="category" disabled hidden>
              Select a category
            </option>
            <option value="Footwear">Footwear</option>
            <option value="Apparel">Apparel</option>
            <option value="Groceries">Groceries</option>
            <option value="Household">Household</option>
            <option value="Technique">Technique</option>
            <option value="Other">Other</option>
          </select>
          <div className="items-change-wrapper">
            <button onClick={() => handleAddItem()} type="button">
              ADD
            </button>
            <button onClick={() => handleDeleteItem(index)} type="button">
              DELETE
            </button>
          </div>
        </form>
      ))}
      {errorMsg && <p>Please mark checked or delete items</p>}
      <div className="sum">
        <p>ITEMS IN CHART: {calculateSum()}</p>
        <p>SUM {calculateSumMoney()}€</p>
        <p>DATE: {dateTime} </p>
        <button type="submit" onClick={handleDateTime}>
          DONE
        </button>
      </div>
    </div>
  );
};
export default NewShoppingList;
