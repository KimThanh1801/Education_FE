import React from "react";
import "../Academy/AchievementSection.css"; // Đã có CSS cho .add-btn

const AddCertificateButton = ({ onClick }) => {
  return (
    <button className="add-btn" onClick={onClick}>
      +
    </button>
  );
};

export default AddCertificateButton;
