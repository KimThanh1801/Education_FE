import React, { useState, useEffect } from "react";
import "./AcademyForm.css";

const AcademyForm = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDesc(initialData.description || "");
      setPreview(initialData.image || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCert = {
      id: initialData ? initialData.id : Date.now(),
      title,
      description: desc,
      image: image ? URL.createObjectURL(image) : preview, // giữ hình cũ nếu không chọn mới
    };
    onSave(newCert);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>{initialData ? "Edit Certificate" : "Add Certificate"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "8px" }}
            />
          )}
          <div className="btn-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademyForm;
