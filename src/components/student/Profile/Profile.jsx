// Profile.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";
import SubjectCards from "./SubjectCards";
import Achievements from "./Achievements";
import PersonalInfo from "./PersonalInfo";
import AccountSettings from "./AccountSettings";
import ArchivedSubjects from "./ArchivedSubjects";
import { getStudents, getUserGoals } from "../../../services/api/StudentAPI";
import {
  FaBolt,
  FaBook,
  FaTrophy,
  FaClipboard,
  FaCog,
  FaChartLine,
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaArchive 
} from "react-icons/fa";

// Component hiển thị 1 hoạt động
const ActivityItem = ({ activity }) => (
  <div className="activity-item">
    <div className="activity-icon" style={{ backgroundColor: activity.color }}>
      {activity.icon}
    </div>
    <div className="activity-content">
      <h4 className="activity-title">{activity.title}</h4>
      <p className="activity-subtitle">{activity.subtitle}</p>
    </div>
    <span className="activity-time">{activity.time}</span>
  </div>
);

// Card tiến độ học tập
const ProgressCard = ({ completed }) => (
  <div className="progress-card">
    <div className="card-header">
      <span className="card-icon"><FaChartLine /></span>
      <h3 className="card-title">Tiến độ học tập</h3>
    </div>
    <div className="progress-content">
      <div className="progress-text">
        <span className="progress-label-title">Hoàn thành</span>
        <span className="progress-percentage-profile">{completed}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${completed}%` }}></div>
      </div>
    </div>
  </div>
);

// Card điểm nổi bật
const HighlightsCard = ({ highlights }) => (
  <div className="highlights-card">
    <div className="card-header">
      <span className="card-icon"><FaStar /></span>
      <h3 className="card-title">Điểm nổi bật</h3>
    </div>
    <div className="highlights-content">
      <div className="highlight-item">
        <span className="highlight-label">Điểm cao nhất</span>
        <span className="highlight-value grade">{highlights.highestGrade}</span>
      </div>
      <div className="highlight-item">
        <span className="highlight-label">Môn yêu thích</span>
        <span className="highlight-value subject">{highlights.favoriteSubject}</span>
      </div>
      <div className="highlight-item">
        <span className="highlight-label">Thứ hạng lớp</span>
        <span className="highlight-value ranking">{highlights.ranking}</span>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [studentData, setStudentData] = useState(null);
  const [goals, setGoals] = useState([]);

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: <FaBolt /> },
    { id: "subjects", label: "Môn học", icon: <FaBook /> },
    { id: "achievements", label: "Thành tích", icon: <FaTrophy /> },
    { id: "info", label: "Thông tin", icon: <FaClipboard /> },
    { id: "settings", label: "Cài đặt", icon: <FaCog /> },
      { id: "archive", label: "Kho lưu trữ", icon: <FaArchive /> },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        if (!user?.id) return;

 
        const students = await getStudents();
        const currentStudent = students.find(s => String(s.id) === String(user.id));
        if (!currentStudent) return;

    
        const userGoals = await getUserGoals(user.id);

        setStudentData({
          id: currentStudent.id,
          name: currentStudent.name || "",
          avatar: currentStudent.image || "",
          major: currentStudent.major || "",
          year: currentStudent.year || "",
          studentId: currentStudent.studentId || "",
          enrollDate: currentStudent.enrollDate || "",
          gpa: currentStudent.gpa || "0",
          achievements: currentStudent.achievements || 0,
          activities: currentStudent.activities || [
            { title: "Tham gia lớp học", subtitle: "JavaScript nâng cao", time: "Hôm nay", color: "#f0ad4e", icon: <FaBolt /> },
            { title: "Hoàn thành bài tập", subtitle: "ReactJS cơ bản", time: "Hôm qua", color: "#5bc0de", icon: <FaBook /> },
          ],
          progress: currentStudent.progress || { completed: 0 },
          highlights: currentStudent.highlights || { highestGrade: "0", favoriteSubject: "-", ranking: "-" },
        });

        setGoals(userGoals || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!studentData) return <div>Đang tải thông tin sinh viên...</div>;

  // Tính tổng môn học
  const totalSubjects = goals ? Array.from(new Set(goals.map(g => g.course))).length : 0;

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="profile-main-info">
            <div className="avatar-container" onClick={ () => setActiveTab("info")}>
           
            <img src={studentData.avatar} alt={studentData.name} className="profile-avatar" />
            </div>
            <div className="basic-info" onClick={()=>setActiveTab('info')}>
              <div className="name-section">
                <h1 className="student-name">{studentData.name}</h1>
                <span className="status-badge">Đang học</span>
              </div>
              <p className="student-major">{studentData.major} • {studentData.year}</p>
              <div className="student-details">
                <span className="detail-item"><FaUser /> {studentData.studentId}</span>
                <span className="detail-item"><FaCalendarAlt /> {studentData.enrollDate}</span>
              </div>
            </div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number gpa">{studentData.gpa}</div>
              <div className="stat-label">GPA</div>
            </div>
            <div className="stat-item">
              <div className="stat-number subjects">{totalSubjects}</div>
              <div className="stat-label">Môn học</div>
            </div>
            <div className="stat-item">
              <div className="stat-number achievements">{studentData.achievements}</div>
              <div className="stat-label">Thành tích</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="navigation-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      {activeTab === "overview" && (
        <div className="main-content-content">
          <div className="content-left">
            <div className="activity-section">
              <h3 className="section-title">⚡ Hoạt động gần đây</h3>
              <div className="activity-list">
                {studentData.activities.map((act, i) => (
                  <ActivityItem key={i} activity={act} />
                ))}
              </div>
            </div>
          </div>
          <div className="content-right">
            <ProgressCard completed={studentData.progress.completed} />
            <HighlightsCard highlights={studentData.highlights} />
          </div>
        </div>
      )}
      {activeTab === "subjects" && (
        <div className="main-content-content-subjectCards">
          <SubjectCards goals={goals} />
        </div>
      )}
      {activeTab === "achievements" && (
        <div className="main-content-content-subjectCards"><Achievements /></div>
      )}
      {activeTab === "info" && (
        <div className="main-content-content-info">
          <PersonalInfo student={studentData} setStudentData={setStudentData} />
        </div>
      )}
      {activeTab === "settings" && (
        <div className="main-content-content-subjectCards"><AccountSettings /></div>
      )}
      {activeTab === "archive" && (
  <div className="main-content-content-subjectCards">
    <ArchivedSubjects />
  </div>
)}

    </div>
  );
};

export default Profile;
