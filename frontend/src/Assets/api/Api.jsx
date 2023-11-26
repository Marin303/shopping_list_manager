import React, { useEffect, useState } from "react";
import "./api.scss";
import axios from "axios";

const Api = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModes, setEditModes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [handleVisible, setHandleVisible] = useState(true);

  const deleteConfirm = {
    index: null,
    confirmed: false,
  };
  const [deleteConfirmation, setDeleteConfirmation] = useState(deleteConfirm);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        const initialProducts = response.data[category] || [];
        const initialEditModes = Array(initialProducts.length).fill(false);
        setProducts(initialProducts);
        setEditModes(initialEditModes);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category]);

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

    // Implement logic to update the product data in the backend or wherever needed
    console.log("Save product:", updatedProducts[productIndex]);
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

    setDeleteConfirmation(deleteConfirm);
  };

  const handleCancelDelete = () => {
    setHandleVisible(true);
    setDeleteConfirmation(deleteConfirm);
  };

  const handleEditChange = (e, field) => {
    switch (field) {
      case "name":
        setNewName(e.target.value);
        break;
      case "amount":
        setNewAmount(e.target.value);
        break;
      case "price":
        setNewPrice(e.target.value);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available for this category.</p>;
  }

  return (
    <ul className="products_container">
      {products.map((product, index) => (
        <li key={`${product.name}-${index}`}>
          <img
            src={`http://localhost:3001/${product.img}`}
            alt={product.name}
            className="products"
          />
          <p className="product-name">
            {editModes[index] ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => handleEditChange(e, "name")}
              />
            ) : (
              product.name
            )}
          </p>
          <p className="product-amount">
            {editModes[index] ? (
              <input
                type="number"
                value={newAmount}
                onChange={(e) => handleEditChange(e, "amount")}
              />
            ) : (
              `amount: ${product.amount}`
            )}
          </p>
          <p className="product-price">
            {editModes[index] ? (
              <input
                type="number"
                value={newPrice}
                onChange={(e) => handleEditChange(e, "price")}
              />
            ) : (
              `${product.price}€`
            )}
          </p>
          <p className="product-category">{product.category}</p>
          <p className="product-date">{product.date}</p>
          <div className="buttonWrapper">
            <button
              onClick={() => handleEdit(index)}
              className={handleVisible ? "" : "hidden"}
            >
              Edit
            </button>

            {editModes[index] && !deleteConfirmation.confirmed && (
              <>
                <button
                  onClick={() => handleDelete(index)}
                  className={handleVisible ? "" : "hidden"}
                >
                  Delete
                </button>
                {deleteConfirmation.index === index && (
                  <>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
                  </>
                )}
                <button
                  onClick={() => handleSave(index)}
                  className={handleVisible ? "" : "hidden"}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Api;
