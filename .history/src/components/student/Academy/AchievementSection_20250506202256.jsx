import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import AddCertificateButton from "./AddCertificateButton";
import AcademyForm from "./AcademyForm";
import certificateData from "../../../data/certificates.json";
import "./AchievementSection.css";

const AchievementSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null); // <-- Thêm trạng thái chỉnh sửa

  useEffect(() => {
    setCertificates(certificateData);
  }, []);

  const handleAddCertificate = (newCert) => {
    if (editingCert) {
      // Cập nhật chứng chỉ đang chỉnh sửa
      const updated = certificates.map((cert) =>
        cert.id === editingCert.id ? { ...cert, ...newCert } : cert
      );
      setCertificates(updated);
      setEditingCert(null);
    } else {
      // Thêm mới
      setCertificates([...certificates, newCert]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xoá?");
    if (confirmed) {
      setCertificates(certificates.filter((cert) => cert.id !== id));
    }
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setShowForm(true);
  };

  return (
    <div className="achievement-section">
      <div className="header">
        <h2>Academy achievements</h2>
        <AddCertificateButton onClick={() => {
          setEditingCert(null); // reset chỉnh sửa
          setShowForm(true);
        }} />
      </div>

      <div className="card-grid">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            data={cert}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {showForm && (
        <AcademyForm
          onClose={() => {
            setShowForm(false);
            setEditingCert(null);
          }}
          onSave={handleAddCertificate}
          initialData={editingCert} // <-- truyền dữ liệu cũ nếu có
        />
      )}
    </div>
  );
};

export default AchievementSection;
