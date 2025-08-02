import React from "react";
import "./ActionButtons.css";

const actions = [
  { icon: "🎯", label: "Goals" },
  { icon: "📘", label: "Courses" },
  { icon: "💡", label: "Habits" },
  { icon: "🔁", label: "Confession" },
];

const ActionButtons = () => {
  return (
    <div className="action-buttons-container">
      {actions.map((a, i) => (
        <div key={i} className="action-button">
          <div className="action-icon">{a.icon}</div>
          <div className="action-label">{a.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ActionButtons;
