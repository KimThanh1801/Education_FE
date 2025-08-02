import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import AddCertificateButton from "./AddCertificateButton";
import AcademyForm from "./AcademyForm";
import certificateData from "../../../data/certificates.json";
import "./AchievementSection.css";

const AchievementSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setCertificates(certificateData);
  }, []);

  const handleAddOrEdit = (cert) => {
    if (editData) {
      // Edit mode
      setCertificates((prev) =>
        prev.map((c) => (c.id === cert.id ? cert : c))
      );
    } else {
      // Add mode
      setCertificates([...certificates, cert]);
    }
    setShowForm(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this certificate?");
    if (confirmDelete) {
      setCertificates(certificates.filter((cert) => cert.id !== id));
    }
  };

  const handleEdit = (cert) => {
    setEditData(cert);
    setShowForm(true);
  };

  return (
    <div className="achievement-wrapper">
      <div className="achievement-header">
        <h2>Academy achievements</h2>
        <AddCertificateButton onAdd={() => {
          setEditData(null);
          setShowForm(true);
        }} />
      </div>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            data={cert}
            onDelete={() => handleDelete(cert.id)}
            onEdit={() => handleEdit(cert)}
          />
        ))}
      </div>

      {showForm && (
        <AcademyForm
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onSave={handleAddOrEdit}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default AchievementSection;
