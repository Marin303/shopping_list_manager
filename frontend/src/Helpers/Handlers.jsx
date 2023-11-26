import { useState } from "react";

export const useShoppingListFunction = ({ listName }) => {
  const savedData =
    JSON.parse(localStorage.getItem(`shoppingListData_${listName}`)) || {};

  const [items, setItems] = useState(savedData.items);
  const [dateTime, setDateTime] = useState(null);

  const createNewItem = () => ({
    name: "",
    checked: false,
    quantity: "",
    price: "",
    category: "",
  });

  const handleDeleteItem = (index) => {
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    } else {
      // If it's the last form, clear its values instead of deleting
      const updatedItems = [createNewItem()];
      setItems(updatedItems);
    }
  };

  const handleToggleCheckbox = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      checked: !updatedItems[index].checked,
    };
    setItems(updatedItems);
  };

  const handleProductName = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  // Handle changes in the quantity input
  const handleQuantityChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(e.target.value) || 1;
    setItems(updatedItems);
  };

  // Handle changes in the price input
  const handlePriceChange = (index, e) => {
    const updatedItems = [...items];
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    updatedItems[index].price = newValue;
    setItems(updatedItems);
  };

  const handleCategoryChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].category = e.target.value;
    setItems(updatedItems);
  };

  const calculateSum = () => {
    return items?.reduce(
      (sum, item) => (item.checked ? sum + item.quantity : sum),
      0
    );
  };

  const calculateSumMoney = () => {
    return items?.reduce(
      (sum, item) => (item.checked ? sum + item.price * item.quantity : sum),
      0
    );
  };

  const handleDateTime = (formattedDateTime) => {
    setDateTime(formattedDateTime);
  };

  return {
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
    handleDateTime,
  };
};
