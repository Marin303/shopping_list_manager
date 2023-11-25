import axios from "axios";
import { useState } from "react";

export const useShoppingListFunction = () => {



   /*  import { useShoppingListFunction } from "../../Helpers/Crud";
    const {
      items,
      dateTime,
      errorMsg,
      category,
      handleAddItem,
      handleDeleteItem,
      handleToggleCheckbox,
      handleProductName,
      handleQuantityChange,
      handlePriceChange,
      handleCategoryChange,
      calculateSum,
      calculateSumMoney,
      handleDateTime,
    } = useShoppingListFunction(); */


  const [items, setItems] = useState([]);
  const [dateTime, setDateTime] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [category] = useState("");

  const itemsObject = {
    name: "",
    checked: false,
    quantity: "",
    price: "",
    category: "",
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { ...itemsObject }]);
  };

  const handleDeleteItem = (index) => {
    if (items.length >= 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleToggleCheckbox = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleProductName = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].name = e.target.value;
    setItems(updatedItems);
  };

  const handleQuantityChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(e.target.value) || 1;
    setItems(updatedItems);
  };

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

  const handleDateTime = async () => {
    const allChecked = items.every((item) => item.checked);

    if (allChecked) {
      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.toLocaleDateString()}`;
      setDateTime(formattedDateTime);
      setErrorMsg(false);

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

  return {
    items,
    dateTime,
    errorMsg,
    category,
    handleAddItem,
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
