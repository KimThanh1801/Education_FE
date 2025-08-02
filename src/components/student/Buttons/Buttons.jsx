import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import { deleteInClass, getInClassByID } from "../../../services/api/StudentAPI";

export default function Buttons({ type, inclass, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);

  const handleUpdateClick = async () => {
    if (!inclass?.id) return console.error("Missing inclass.id");
    try {
      const data = await getInClassByID(inclass.id);
      setRecord(data);
      setShowForm(true);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const handleDelete = async () => {
    if (!inclass?.id) return console.error("Missing inclass.id");
    try {
      await deleteInClass(inclass.id);
      alert("Delete successful");

      if (onDelete) onDelete(inclass.id); // Gọi callback xóa đúng prop
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleSave = (updatedItem) => {
    if (onUpdate) onUpdate(updatedItem); // Cập nhật lên danh sách chính
    setShowForm(false);
    setRecord(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setRecord(null);
  };

  return (
    <>
      <div className="button-group">
        <button className="btn update btn-inclass" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="btn delete btn-inclass" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {showForm && record && (
        <div className="modal-overlay">
          <ClassPlanForm
            inclass={record}
            onCancel={handleCancelForm}
            onSave={handleSave}
          />
        </div>
      )}
    </>
  );
}