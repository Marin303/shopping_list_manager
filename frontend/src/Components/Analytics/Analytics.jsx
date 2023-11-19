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
      <button onClick={() => handleShowAnalytics("month")}>
        Show Analitics
      </button>

      {showAnalytics && (
        <div className="analytics_modal">
          <h3>Analytics for {selectedMonth}</h3>

          <button onClick={handleCloseAnalytics}>Zatvori</button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
