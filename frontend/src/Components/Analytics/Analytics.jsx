import React, { useEffect, useState } from "react";
import axios from "axios";
import "./analytics.scss";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
        //console.log(response);
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
  // console.log(products);
  // console.log("apparel", products['Apparel']);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const convertDateToMonth = (dateString) => {
    const dateParts = dateString.split("/");
    const monthIndex = parseInt(dateParts[0], 10) - 1; // 0-based is Months

    return months[monthIndex];
  };

  const filteredProducts =
    selectedCategory && selectedMonth && products[selectedCategory]
      ? products[selectedCategory].filter(
          (product) => convertDateToMonth(product.date) === selectedMonth
        )
      : [];

  // total sum of product prices
  const totalSum = filteredProducts.reduce(
    (sum, product) =>
      sum + parseFloat(product.price.replace("€", "").replace(",", ".")),
    0
  );

  const chartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="analytics_container">
      <h4 className="header_title">Analytics</h4>
      <div className="analytics_wrapper">
        <select name="month" id="month" onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <select
          name="product-category"
          id="product-category"
          onChange={handleCategoryChange}
        >
          <option value="Apparel">Apparel</option>
          <option value="Footwear">Footwear</option>
          <option value="Groceries">Groceries</option>
          <option value="Household">Household</option>
          <option value="Technique">Technique</option>
          <option value="Other">Other</option>
        </select>

        <div>
          {filteredProducts.map((product, index) => (
            <div key={index}>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}€</p>
              <p>Date: {convertDateToMonth(product.date)}</p>
            </div>
          ))}
          <p className="total-sum">Total sum: {totalSum.toFixed(2)}€</p>
        </div>
        <div className="chart">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
