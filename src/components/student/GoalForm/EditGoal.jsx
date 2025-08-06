import React from "react";

export default function EditGoal({
  goal,
  field,
  rowIndex,
  isEditing,
  onStartEdit,
  onChange,
  onSave,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave(goal, rowIndex);
    }
  };
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "6px 8px",
  fontSize: "inherit",
  height: "36px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  appearance: "none",
  WebkitAppearance: "none", 
  MozAppearance: "none",
  backgroundColor: "white",
};


  if (isEditing) {
    if (field === "course") {
      return (
       <td>
  <div style={{ position: "relative" }}>
    <select
      value={goal[field]}
      onChange={(e) => onChange(e, rowIndex, field)}
      onBlur={() => onSave(goal, rowIndex)}
      autoFocus
      style={inputStyle}
    >
      <option value="IT-English">IT-English</option>
      <option value="Communication">Communication</option>
      <option value="Speaking">Speaking</option>
    </select>
  </div>
</td>

      );
    }

    if (field === "dueDate") {
      return (
        <td>
          <input
            type="date"
            value={goal[field]}
            onChange={(e) => onChange(e, rowIndex, field)}
            onBlur={() => onSave(goal, rowIndex)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={inputStyle}
          />
        </td>
      );
    }

    return (
      <td>
        <input
          type="text"
          value={goal[field]}
          onChange={(e) => onChange(e, rowIndex, field)}
          onBlur={() => onSave(goal, rowIndex)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={inputStyle}
        />
      </td>
    );
  }

  return (
    <td onClick={() => onStartEdit(rowIndex, field)} style={{ cursor: "pointer" }}>
      {goal[field]}
    </td>
  );
}
