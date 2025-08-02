import React, { useState } from "react";
import "./AcademyForm.css";

const AcademyForm = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    const newCert = {
      id: Date.now(),
      title,
      description: desc,
      image: URL.createObjectURL(image),
    };
    onSave(newCert);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>Add Certificate</h3>
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
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <div className="btn-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademyForm;
