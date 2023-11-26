import React, { useEffect, useState } from "react";
import "./api.scss";
import axios from "axios";

const Api = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data[category]); // Access products based on the category
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category]); // Fetch data when the category changes

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if products is an array before mapping
  if (!Array.isArray(products)) {
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
          <p className="product-name">{product.name}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-amount">amount: {product.amount}</p>
          <p className="product-price">{product.price}€</p>
          <p className="product-date">{product.date}</p>
        </li>
      ))}
    </ul>
  );
};

export default Api;
