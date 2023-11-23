import React, { useEffect, useState } from "react";
import axios from "axios";
import "./analytics.scss";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredPercentage, setHoveredPercentage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

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

  const getChartData = () => {
    if (!selectedMonth) return null;

    const categorySums = {};
    Object.keys(products).forEach((category) => {   // Object, product.json mistake - should be array
      const categoryProducts = products[category];
      const categorySum = categoryProducts
        .filter((product) => 
              convertDateToMonth(product.date) === selectedMonth
               )
        .reduce(
          (sum, product) =>
            sum +
            parseFloat(product.price.replace("€", "").replace(",", ".")), // json file replace characters
          0
        );
      categorySums[category] = categorySum;
    });

    const total = Object.values(categorySums).reduce((sum, value) => sum + value, 0); 

    const chartData = {
      labels: Object.keys(categorySums),
      datasets: [
        {
          label: selectedMonth,
          data: Object.values(categorySums).map((value) => Math.round(value)),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
          hoverOffset: 4, // distance of the slice on hover
        },
      ],
    };

    const chartOptions = {
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          enabled: false, // disable default tooltip
        },
      },
      onHover: (event, chartElement) => {
        if (chartElement.length > 0) {
          const hoveredIndex = chartElement[0].index; 
          const hoveredCategory = chartData.labels[hoveredIndex]; 
          const hoveredValue = chartData.datasets[0].data[hoveredIndex]; // value corresponding to the hovered element
          const hoveredPercentage = ((hoveredValue / total) * 100).toFixed(2); 
          setHoveredCategory(hoveredCategory);
          setHoveredPercentage(hoveredPercentage);
        } else {
          setHoveredCategory(null);
          setHoveredPercentage(null);
        }
      },
    };

    return { chartData, chartOptions };
  };

  return (
    <div className="analytics_container">
      <h4 className="header_title">Analytics</h4>
      <div className="analytics_wrapper">
        <select name="month" id="month" onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <div className="chart">
          {selectedMonth && (
            <>
              <Pie
                data={getChartData().chartData}
                options={getChartData().chartOptions}
              />
              {hoveredCategory && (
                <p>
                  Category: {hoveredCategory} - {hoveredPercentage}%
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
