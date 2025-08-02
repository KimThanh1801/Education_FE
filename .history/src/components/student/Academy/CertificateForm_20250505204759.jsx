import React, { useState } from "react";

const AddCertificateForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !imageFile) {
      alert("Please fill all fields.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newCert = {
        name,
        description,
        image: reader.result,
      };
      onAdd(newCert);
      setName("");
      setDescription("");
      setImageFile(null);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-xl bg-gray-50">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Name of Academy or Achievement"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Describe your Academy or Achievement"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
};

export default AddCertificateForm;
