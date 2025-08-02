import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import AddCertificateButton from "./AddCertificateButton";
import AcademyForm from "./AcademyForm";
import "./AchievementSection.css";
import { academyAPI } from '../../../services/api/StudentAPI';
import { toast } from "react-toastify";

const AchievementSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademies();
  }, []);

  const fetchAcademies = async () => {
    try {
      setLoading(true);
      const data = await academyAPI.getAllAcademies();
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        media_type: item.media_type,
        media_path_url: item.media_path_url,   
      }));      
      setCertificates(formattedData);
    } catch (error) {
      toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      console.error("Error fetching academies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertificate = async (formData) => {
    const isEdit = !!editingCert;

    for (let pair of formData.entries()) {
      console.log("🧾 FormData:", pair[0], pair[1]);
    }

    try {
      let result;
      if (isEdit) {
        result = await academyAPI.updateAcademy(editingCert.id, formData);
      } else {
        result = await academyAPI.addAcademy(formData);
      }

      const newCert = {
        id: result.id,
        title: result.title,
        description: result.description,
        media_type: result.media_type,
        media_path_url: result.media_path_url,
      };

      setCertificates((prev) =>
        isEdit
          ? prev.map((cert) => (cert.id === newCert.id ? newCert : cert))
          : [...prev, newCert]
      );

      toast.success(isEdit ? "Cập nhật thành công!" : "Thêm mới thành công!");
      setShowForm(false);
      setEditingCert(null);
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      console.error("Error saving academy:", error);
    }
  };
  

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmed) return;

    try {
      await academyAPI.deleteAcademy(id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error("Không thể xóa. Vui lòng thử lại.");
      console.error("Error deleting academy:", error);
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
<AddCertificateButton
          onClick={() => {
            setEditingCert(null);
            setShowForm(true);
          }}
        />
      </div>

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <div className="card-grid-1">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                data={cert}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="no-data">Chưa có thành tựu nào được thêm vào.</p>
          )}
        </div>
      )}

      {showForm && (
        <AcademyForm
          onClose={() => {
            setShowForm(false);
            setEditingCert(null);
          }}
          onSave={handleAddCertificate}
          initialData={editingCert}
        />
      )}
    </div>
  );
};

export default AchievementSection;