import React from "react";
import ProgressIndicators from "./ProgressIndicators";
import CalendarWidget from "./CalendarWidget";
import "./ProgressDashboard.css";

const ProgressDashboard = () => {
  return (
    <div className="progress-dashboard">
      <div className="col1">
      <ProgressIndicators />
      </div>
      <div className="col1">
      <CalendarWidget />
      </div>
    </div>
  );
};

export default ProgressDashboard;