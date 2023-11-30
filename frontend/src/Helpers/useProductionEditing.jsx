import axios from "axios";
import { useState } from "react";

const useProductEditing = (category) => {
  const [products, setProducts] = useState([]);
  const [editModes, setEditModes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    index: null,
    confirmed: false,
  });
  const [handleVisible, setHandleVisible] = useState(true);

  const handleEdit = (productIndex) => {
    setNewName(products[productIndex].name);
    setNewAmount(products[productIndex].amount);
    setNewPrice(products[productIndex].price);
    setEditModes((prevModes) =>
      prevModes.map((mode, index) => (index === productIndex ? !mode : mode))
    );
  };

  const handleSave = (productIndex) => {
    setEditModes(
      (prevModes) =>
        prevModes.map((mode, index) => (index === productIndex ? !mode : mode)) //switch between edit mode
    );
    const updatedProducts = [...products];
    updatedProducts[productIndex].name = newName;
    updatedProducts[productIndex].amount = newAmount;
    updatedProducts[productIndex].price = newPrice;
    setProducts(updatedProducts);

    try {
      axios.put("http://localhost:3001/api/products", {
        category: category,
        index: productIndex,
        newName: newName,
        newAmount: newAmount,
        newPrice: newPrice,
      });
      console.log("Product data updated successfully");
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  const handleDelete = (productIndex) => {
    setHandleVisible(false);
    setDeleteConfirmation({
      index: productIndex,
      confirmed: false,
    });
  };

  const handleConfirmDelete = () => {
    setHandleVisible(true);
    const indexToDelete = deleteConfirmation.index;
    const updatedProducts = [...products];
    updatedProducts.splice(indexToDelete, 1);
    setProducts(updatedProducts);

    setDeleteConfirmation({ index: null, confirmed: false });
  };

  const handleCancelDelete = () => {
    setHandleVisible(true);
    setDeleteConfirmation({ index: null, confirmed: false });
  };

  const handleEditChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "name":
        setNewName(value);
        break;
      case "amount":
        setNewAmount(value);
        break;
      case "price":
        setNewPrice(value);
        break;
      default:
        break;
    }
  };

  return {
    products,
    category,
    editModes,
    newName,
    newAmount,
    newPrice,
    handleVisible,
    deleteConfirmation,
    setProducts,
    setEditModes,
    handleSave,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleEditChange,
  };
};

export default useProductEditing;
