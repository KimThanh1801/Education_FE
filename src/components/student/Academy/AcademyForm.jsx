import React, { useState, useEffect } from "react";
import "./AcademyForm.css";

const AcademyForm = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDesc(initialData.description || "");
      setPreviewUrl(initialData.mediaUrl || ""); 
      setMediaType(initialData.mediaType || "");
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
        ? "video"
        : "";

    if (!type) {
      alert("Chỉ chấp nhận ảnh hoặc video!");
      return;
    }

    setMediaFile(file);
    setMediaType(type);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);

    if (mediaFile) {
      formData.append("media_file", mediaFile);
      formData.append("media_type", mediaType); 
    } else if (initialData?.mediaType) {
      formData.append("media_type", mediaType || initialData?.media_type || ""); 
    } else {
      alert("Vui lòng chọn file hoặc đảm bảo media_type có giá trị.");
      return;
    }

    for (let pair of formData.entries()) {
      console.log("📦 FormData Key-Value:", pair[0], pair[1]);
    }

    onSave(formData);
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
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {previewUrl && mediaType === "image" && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxHeight: "150px",
                borderRadius: "8px",
              }}
            />
          )}
          {previewUrl && mediaType === "video" && (
            <video
              src={previewUrl}
              controls
              style={{
                marginTop: "10px",
                maxHeight: "150px",
                borderRadius: "8px",
              }}
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
