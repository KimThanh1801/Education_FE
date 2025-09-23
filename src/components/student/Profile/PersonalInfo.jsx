import React, { useState, useEffect } from "react";
import { updateStudent } from "../../../services/api/StudentAPI";
import {
  FaUser,
  FaImage,
  FaGraduationCap,
  FaUserGraduate,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";
import "./PersonalInfo.css";

const PersonalInfo = ({ student, setStudentData }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    major: "",
    year: "",
    studentId: "",
    enrollDate: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        image: student.avatar || "",
        major: student.major || "",
        year: student.year || "",
        studentId: student.studentId || "",
        enrollDate: student.enrollDate || "",
      });
    }
  }, [student]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image → convert to base64
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = await updateStudent(student.id, formData);

      setStudentData((prev) => ({
        ...prev,
        avatar: updatedStudent.image || formData.image,
        name: updatedStudent.name || formData.name,
        major: updatedStudent.major || formData.major,
        year: updatedStudent.year || formData.year,
        studentId: updatedStudent.studentId || formData.studentId,
        enrollDate: updatedStudent.enrollDate || formData.enrollDate,
      }));

      alert("Update successful!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  const formItems = [
    {
      id: 1,
      label: "Full Name",
      name: "name",
      value: formData.name,
      icon: <FaUser />,
      color: "#3b82f6",
      type: "text",
    },
    {
      id: 2,
      label: "Enroll Date",
      name: "enrollDate",
      value: formData.enrollDate,
      icon: <FaCalendarAlt />,
      color: "#f97316",
      type: "date",
    },
    {
      id: 3,
      label: "Major",
      name: "major",
      value: formData.major,
      icon: <FaGraduationCap />,
      color: "#8b5cf6",
      type: "text",
    },
    {
      id: 4,
      label: "Year",
      name: "year",
      value: formData.year,
      icon: <FaUserGraduate />,
      color: "#f59e0b",
      type: "text",
    },
    {
      id: 5,
      label: "Student ID",
      name: "studentId",
      value: formData.studentId,
      icon: <FaIdCard />,
      color: "#ef4444",
      type: "text",
    },
    {
      id: 6,
      label: "Profile Picture",
      name: "image",
      value: formData.image,
      icon: <FaImage />,
      color: "#10b981",
      type: "file",
    }, // đưa xuống cuối
  ];

  return (
    <div className="personal-info-container">
      <div className="personal-info-card">
        <h2 className="section-title">Update Personal Information</h2>
        <form onSubmit={handleSubmit} className="info-grid">
          {formItems.map((item) => (
            <div key={item.id} className="info-item">
              {item.type === "file" ? (
                <div className="info-content">
                  <div className="info-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="info-text-info">
                    <label className="info-label">{item.label}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChangeImage}
                      className="info-input"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="preview-avatar"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="info-content">
                  <div className="info-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="info-text-info">
                    <label className="info-label">{item.label}</label>
                    <input
                      type={item.type}
                      name={item.name}
                      value={item.value}
                      onChange={handleChange}
                      className="info-input"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
