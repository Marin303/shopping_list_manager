import React, { useEffect, useState } from "react";
import "./api.scss";
import axios from "axios";

const Api = ({ category }) => {
  //console.log(category)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if products is an array before mapping
  if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }

  // Filter products by category
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <ul className="products_container">
      {filteredProducts.map((product) => (
        <li key={product.name}>
          <img
            src={`http://localhost:3001/${product.img}`}
            alt={product.name}
            className="products"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-amount">amount: {product.amount}</p>
          <p className="product-price">{product.price}</p>
        </li>
      ))}
    </ul>
  );
};

export default Api;
