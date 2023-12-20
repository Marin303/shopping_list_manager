import React, { useEffect, useState } from "react";
import "./api.scss";
import axios from "axios";
import useProductEditing from "../../Helpers/useProductionEditing";

const Api = ({ category }) => {
  const {
    products,
    editModes,
    newName,
    newAmount,
    newPrice,
    deleteConfirmation,
    setProducts,
    setEditModes,
    handleVisible,
    handleEdit,
    handleEditChange,
    handleSave,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
  } = useProductEditing(category);
  const [loading, setLoading] = useState(true);

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
  }, [category, setProducts, setEditModes]);

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
                type="text"
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
              aria-label="edit-button"
            >
              Edit
            </button>

            {editModes[index] && !deleteConfirmation.confirmed && (
              <>
                <button
                  onClick={() => handleDelete(index)}
                  className={handleVisible ? "" : "hidden"}
                  aria-label="delete-button"
                >
                  Delete
                </button>
                {deleteConfirmation.index === index && (
                  <>
                    <button onClick={handleConfirmDelete} aria-label="confirm">Yes</button>
                    <button onClick={handleCancelDelete} aria-label="decline">No</button>
                  </>
                )}
                <button
                  onClick={() => handleSave(index)}
                  className={handleVisible ? "" : "hidden"}
                  aria-label="save-button"
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
