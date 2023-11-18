import React, { useState } from "react";
import "./groceries.scss";

const Groceries = () => {
  const [items, setItems] = useState([{ name: "", checked: false, quantity: 1, price: 0 }]);

  const handleAddItem = () => {
    setItems([...items, { name: "", checked: false, quantity: 1, price: 0 }]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleToggleCheckbox = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleInputChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].name = event.target.value;
    setItems(updatedItems);
  };

  const handleQuantityChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(event.target.value) || 1;
    setItems(updatedItems);
  };

  const handlePriceChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].price = parseFloat(event.target.value) || 0;
    setItems(updatedItems);
  };

  const calculateSum = () => {
    return items.reduce((sum, item) => (item.checked ? sum + item.quantity : sum), 0);
  };

  const calculateSumMoney = () => {
    return items.reduce((sum, item) => (item.checked ? sum + item.price * item.quantity : sum), 0);
  };

  return (
    <div className="groceries_container">
      <h4>Groceries</h4>
      {items.map((item, index) => (
        <label htmlFor={`list-item-${index}`} key={index} className="wrapper-label">
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
            type="number"
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
        <button type="submit">DONE</button>
        <p>ITEMS IN CHART: {calculateSum()}</p>
        <p>SUM {calculateSumMoney()}€</p>
      </div>
    </div>
  );
};

export default Groceries;
