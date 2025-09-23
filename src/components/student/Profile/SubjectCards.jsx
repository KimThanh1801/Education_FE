import React, { useState, useEffect } from "react";
import "./SubjectCards.css";
import { getUserGoals } from "../../../services/api/StudentAPI";

const SubjectCards = () => {
  const [goals, setGoals] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        if (!user?.id) return;
        const data = await getUserGoals(user.id);
        setGoals(data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };
    fetchGoals();
  }, [user?.id]);

  const handleArchiveSubject = (subject) => {
    const archivedSubjects = JSON.parse(localStorage.getItem("archivedSubjects")) || [];
    if (!archivedSubjects.find(s => s.name === subject.name)) {
      archivedSubjects.push(subject);
      localStorage.setItem("archivedSubjects", JSON.stringify(archivedSubjects));
      alert(`Môn "${subject.name}" đã được chuyển vào kho lưu trữ!`);
    }
    setOpenMenuId(null);
  };

  const lockedSubjects = JSON.parse(localStorage.getItem("lockedSubjects")) || [];
  const archivedSubjects = JSON.parse(localStorage.getItem("archivedSubjects")) || [];

  const subjects =
    goals?.reduce((acc, goal) => {
      if (!goal.course) return acc;
      const subject = acc.find((s) => s.name === goal.course);
      if (subject) {
        subject.total++;
        if (goal.completeStatus === "done") subject.completed++;
      } else {
        acc.push({
          name: goal.course,
          total: 1,
          completed: goal.completeStatus === "done" ? 1 : 0,
        });
      }
      return acc;
    }, []) || [];

  const getGradeByProgress = (progress) => {
    if (progress >= 90) return "A";
    if (progress >= 80) return "B+";
    if (progress >= 70) return "B";
    if (progress >= 60) return "C+";
    return "D";
  };

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

  const subjectsWithProgress = subjects
    .map((s) => {
      const progress = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
      const grade = getGradeByProgress(progress);
      const isLocked = lockedSubjects.includes(s.name);
      const isArchived = archivedSubjects.find(sub => sub.name === s.name);

      if (isArchived) return null; // bỏ các môn đã lưu trữ

      let status = progress === 100 ? "Hoàn thành" : s.completed > 0 ? "Đang học" : "Sắp học";
      let statusColor = progress === 100 ? "completed" : s.completed > 0 ? "studying" : "upcoming";

      if (isLocked) {
        status = "Đã khóa";
        statusColor = "locked";
      }

      return {
        id: s.name,
        name: s.name,
        progress,
        status,
        statusColor,
        grade,
      };
    })
    .filter(Boolean);

  return (
    <div className="subjects-container">
      <div className="subjects-grid">
        {subjectsWithProgress.length === 0 ? (
          <p>Không có môn học nào!</p>
        ) : (
          subjectsWithProgress.map((subject) => (
            <div key={subject.id} className="subject-card">
              <div className="card-header">
                <div className="subject-info">
                  <h3 className="subject-name">{subject.name}</h3>
                  <span className={`status-badge ${subject.statusColor}`}>{subject.status}</span>
                </div>
                <div className="grade-section">
                  <div className="grade-value" style={{ color: getGradeColor(subject.grade) }}>
                    {subject.grade}
                  </div>
                  <div className="grade-label">Điểm</div>
                </div>
                {/* Menu 3 chấm */}
                <div
                  className="ellipsis-menu"
                  onClick={() => setOpenMenuId(openMenuId === subject.id ? null : subject.id)}
                >
                  ⋮
                </div>
                <div className={`dropdown-menu ${openMenuId === subject.id ? "show" : ""}`}>
                  <div className="dropdown-item" onClick={() => handleArchiveSubject(subject)}>
                    Chuyển vào kho lưu trữ
                  </div>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Tiến độ</span>
                  <span className="progress-percentage">{subject.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-background">
                    <div className="progress-bar-fill" style={{ width: `${subject.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectCards;
