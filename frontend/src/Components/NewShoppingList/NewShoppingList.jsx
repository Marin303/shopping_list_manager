import React, { useState } from "react";
import "./newshoppinglist.scss";

const NewShoppingList = ({listName, items, setItems}) => {
  const [dateTime, setDateTime] = useState(null);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        checked: false,
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // Remove an item at the specified index
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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

  //Calculate the total cost of items in the chart
  const calculateSumMoney = () => {
    return items?.reduce(
      (sum, item) => (item.checked ? sum + item.price * item.quantity : sum),
      0
    );
  };

  const handleDateTime = () => {
    const currentDateTime = new Date();
    const formattedDateTime = `
    ${currentDateTime.toLocaleDateString()} 
    ${currentDateTime.toLocaleTimeString()}
    `;
    setDateTime(formattedDateTime);
  };

  return (
    <div className="new_list_container">
      <h4 className="header_title">Create shopping list - {listName}</h4>
      {items && items.map((item, index) => (
        <label
          htmlFor={`list-item-${index}`}
          key={index}
          className="wrapper-label"
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
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, e)}
            disabled={item.checked}
          />
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
          <div className="items-change-wrapper">
            <button onClick={() => handleAddItem()}>ADD</button>
            <button onClick={() => handleDeleteItem(index)}>DELETE</button>
          </div>
        </label>
      ))}
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
