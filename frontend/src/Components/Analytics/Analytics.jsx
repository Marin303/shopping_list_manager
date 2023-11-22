import React, { useState } from "react";
import "./analytics.scss";

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleShowAnalytics = (month) => {
    setSelectedMonth(month);
    setShowAnalytics(true);
  };

  const handleCloseAnalytics = () => {
    setSelectedMonth("");
    setShowAnalytics(false);
  };

  return (
    <div className="analytics_container">
      <h4 className="header_title">Analytics</h4>
      <button onClick={() => handleShowAnalytics("month")}>
        Show Analitics
      </button>

      {showAnalytics && (
        <div className="analytics_modal">
          <h3>Analytics for {selectedMonth}</h3>
          <p>How much we spent based on category and on specific Month</p>
          <button onClick={handleCloseAnalytics}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
