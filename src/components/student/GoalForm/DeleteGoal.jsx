import React from "react";
import { deleteGoal } from "../../../services/api/StudentAPI";
import "./DeleteGoal.css";

export default function DeleteGoal({ id, onDeleteSuccess, onClose }) {
  const handleDelete = async () => {
    try {
      await deleteGoal(id); 
      onDeleteSuccess(id); 
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Are you sure you want to delete this goal?</h3>
        <div className="popup-buttons">
          <button className="btn-delete" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn-delete" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
