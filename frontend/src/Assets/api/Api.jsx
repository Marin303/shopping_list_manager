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
    handleImageChange,
  
  } = useProductEditing(category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_PRODUCTS_KEY);
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
  const emptyImage = "images/image-not-available.png";
  const baseUrl = process.env.REACT_APP_BASE_URL
  return (
    <ul className="products_container">
      {products.map((product, index) => (
        <li key={`${product.name}-${index}`}>
          <div className="image_wrapper">
            {product.img === emptyImage && (
              <form
                className="image_input_wrapper"
                name="new-image"
                onChange={(e) => handleImageChange(e, index)}
              >
                <input type="file" name="new-image" id="new-image" />
                <label htmlFor="new-image">Choose Image</label>
              </form>
            )}

            <img
              src={`${baseUrl}${
                product.img === emptyImage ? emptyImage : product.img
              }`}
              alt={product.name}
              className="products"
            />
          </div>
          <p className="product-name">
            {editModes[index] ? (
              <input
                type="text"
                name="name"
                autoComplete="off"
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
                name="amount"
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
                name="price"
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
                    <button onClick={handleConfirmDelete} aria-label="confirm">
                      Yes
                    </button>
                    <button onClick={handleCancelDelete} aria-label="decline">
                      No
                    </button>
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
