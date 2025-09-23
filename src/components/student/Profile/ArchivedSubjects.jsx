import React, { useState, useEffect } from "react";
import "./ArchivedSubjects.css";

const ArchivedSubjects = () => {
  const [archivedSubjects, setArchivedSubjects] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("archivedSubjects")) || [];
    setArchivedSubjects(stored);
  }, []);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "#3b82f6";
      case "B+": return "#8b5cf6";
      case "B": return "#10b981";
      case "C+": return "#f59e0b";
      case "D": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const handleRestore = (subject) => {
    const updated = archivedSubjects.filter((s) => s.name !== subject.name);
    setArchivedSubjects(updated);
    localStorage.setItem("archivedSubjects", JSON.stringify(updated));
    alert(`Môn "${subject.name}" đã được khôi phục!`);
  };

  if (archivedSubjects.length === 0) return <p>Không có môn học nào trong kho lưu trữ!</p>;

  return (
    <div className="subjects-grid">
      {archivedSubjects.map((subject, idx) => (
        <div key={idx} className="subject-card">
          <div className="card-header">
            <h3 className="subject-name">{subject.name}</h3>
            <div className="grade-section">
              <div className="grade-value" style={{ color: getGradeColor(subject.grade) }}>
                {subject.grade}
              </div>
              <div className="grade-label">Điểm</div>
            </div>
          </div>
          <button className="restore-btn" onClick={() => handleRestore(subject)}>
            Khôi phục
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArchivedSubjects;
