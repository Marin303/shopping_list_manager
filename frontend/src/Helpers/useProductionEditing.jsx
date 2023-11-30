import { useState } from "react";

const useProductEditing = (initialProducts) => {
  const [products, setProducts] = useState(initialProducts);
  const [editModes, setEditModes] = useState(
    Array(initialProducts.length).fill(false)
  );
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    index: null,
    confirmed: false,
  });

  const startEditing = (productIndex) => {
    setNewName(products[productIndex].name);
    setNewAmount(products[productIndex].amount);
    setNewPrice(products[productIndex].price);
    setEditModes((prevModes) =>
      prevModes.map((mode, index) => (index === productIndex ? !mode : mode))
    );
  };

  const saveEditing = (productIndex) => {
    setEditModes((prevModes) =>
      prevModes.map((mode, index) => (index === productIndex ? !mode : mode))
    );

    const updatedProducts = [...products];
    updatedProducts[productIndex].name = newName;
    updatedProducts[productIndex].amount = newAmount;
    updatedProducts[productIndex].price = newPrice;
    setProducts(updatedProducts);

    // You can pass this function to your backend API call
    // saveProduct(updatedProducts[productIndex]);
  };

  const startDelete = (productIndex) => {
    setDeleteConfirmation({ index: productIndex, confirmed: false });
  };

  const confirmDelete = () => {
    const indexToDelete = deleteConfirmation.index;
    const updatedProducts = [...products];
    updatedProducts.splice(indexToDelete, 1);
    setProducts(updatedProducts);
    setDeleteConfirmation({ index: null, confirmed: false });

    // You can pass this function to your backend API call
    // deleteProduct(indexToDelete);
  };

  const cancelDelete = () => {
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
    editModes,
    newName,
    newAmount,
    newPrice,
    deleteConfirmation,
    startEditing,
    saveEditing,
    startDelete,
    confirmDelete,
    cancelDelete,
    handleEditChange,
  };
};

export default useProductEditing;
