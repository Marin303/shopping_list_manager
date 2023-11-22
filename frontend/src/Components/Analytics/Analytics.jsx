import React, { useEffect, useState } from "react";
import axios from "axios";
import "./analytics.scss";

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="analytics_container">
      <h4 className="header_title">Analytics</h4>
      <select name="month" id="month" onChange={handleMonthChange}>
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>
      <select
        name="product-category"
        id="product-category"
        onChange={handleCategoryChange}
      >
        <option value="apparel">Apparel</option>
        <option value="footwear">Footwear</option>
        <option value="groceries">Groceries</option>
        <option value="household">Household</option>
        <option value="technique">Technique</option>
        <option value="other">Other</option>
      </select>

      <div>
        {selectedCategory &&
          products[selectedCategory].map((product, index) => (
            <div key={index}>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Date: {product.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Analytics;
