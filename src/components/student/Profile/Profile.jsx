import React, { useState } from "react";
import "./Profile.css";
import SubjectCards from "./SubjectCards";
import Achievements from "./Achievements";
import PersonalInfo from "./PersonalInfo";
import AccountSettings from "./AccountSettings";
import {
  FaCamera,
  FaBolt,
  FaBook,
  FaTrophy,
  FaClipboard,
  FaCog,
  FaChartLine,
  FaStar,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [studentData, setStudentData] = useState({
    name: "Hồ Thị Kim Thanh",
    major: "Công nghệ Thông tin",
    year: "Năm 3",
    studentId: "MSSV: 2021001234",
    enrollDate: "Nhập học: 1/9/2021",
    gpa: "3.75",
    subjects: "4",
    achievements: "3",
    avatar:
      "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/491788778_649590807968338_7283296483705890060_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEA64WOCPk2faGpZzs_6RvXsMZwO79oDDewxnA7v2gMN6J1KyWzJG-fNzjaUhGdk3PFs92obEhBggcxATcpX3MD&_nc_ohc=zhX3MVlmvowQ7kNvwG6_1Bf&_nc_oc=AdlDO_6Wb2j_ZPSOqzJOBABy9aWhMPuwlnDakKVGzKzOLmB6MKxnokQmAz3QFmcn6V4&_nc_zt=24&_nc_ht=scontent.fdad3-6.fna&_nc_gid=eVp65YBRV8E_DdDaSCV_1w&oh=00_AfUDtIBeUr81WXSrIs7IgCuyVpoOuboMtVU9tN9xkkVVQg&oe=689960EC",
    activities: [
      {
        title: "Hoàn thành bài tập",
        subtitle: "Lập trình Web",
        time: "2 giờ trước",
        icon: "📝",
        color: "#4F46E5",
      },
      {
        title: "Tham gia thảo luận",
        subtitle: "Cơ sở dữ liệu",
        time: "5 giờ trước",
        icon: "💬",
        color: "#059669",
      },
      {
        title: "Nộp báo cáo",
        subtitle: "Mạng máy tính",
        time: "1 ngày trước",
        icon: "📄",
        color: "#DC2626",
      },
      {
        title: "Đăng ký môn học mới",
        subtitle: "Trí tuệ nhân tạo",
        time: "2 ngày trước",
        icon: "➕",
        color: "#7C3AED",
      },
    ],
    progress: {
      completed: 75,
      total: 100,
    },
    highlights: {
      highestGrade: "A+",
      favoriteSubject: "Lập trình Web",
      ranking: "Top 5",
    },
  });

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: <FaBolt /> },
    { id: "subjects", label: "Môn học", icon: <FaBook /> },
    { id: "achievements", label: "Thành tích", icon: <FaTrophy /> },
    { id: "info", label: "Thông tin", icon: <FaClipboard /> },
    { id: "settings", label: "Cài đặt", icon: <FaCog /> },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="profile-main-info">
            <div className="avatar-container">
              <label htmlFor="avatar-upload" className="avatar-upload-label">
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="profile-avatar"
                />
                <div className="camera-icon">
                  <FaCamera />
                </div>
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageURL = URL.createObjectURL(file);
                    setStudentData((prevData) => ({
                      ...prevData,
                      avatar: imageURL,
                    }));
                  }
                }}
              />
            </div>

            <div className="basic-info">
              <div className="name-section">
                <h1 className="student-name" style={{ color: "white" }}>{studentData.name}</h1>
                <span className="status-badge">Đang học</span>
              </div>
              <p className="student-major">
                {studentData.major} • {studentData.year}
              </p>
              <div className="student-details">
                <span className="detail-item">
                  <FaUser /> {studentData.studentId}
                </span>
                <span className="detail-item">
                  <FaCalendarAlt /> {studentData.enrollDate}
                </span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number gpa">{studentData.gpa}</div>
              <div className="stat-label">GPA</div>
            </div>
            <div className="stat-item">
              <div className="stat-number subjects">{studentData.subjects}</div>
              <div className="stat-label">Môn học</div>
            </div>
            <div className="stat-item">
              <div className="stat-number achievements">
                {studentData.achievements}
              </div>
              <div className="stat-label">Thành tích</div>
            </div>
          </div>

          <button className="edit-button">✏️ Chỉnh sửa</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        {tabs.map((tab) => (
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

      {/* Main Content */}
      {activeTab === "overview" && (
        <div className="main-content-content">
          <div className="content-left">
            <div className="activity-section">
              <h3 className="section-title">
                <span className="title-icon">⚡</span>
                Hoạt động gần đây
              </h3>
              <div className="activity-list">
                {studentData.activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div
                      className="activity-icon"
                      style={{ backgroundColor: activity.color }}
                    >
                      {activity.icon}
                    </div>
                    <div className="activity-content">
                      <h4 className="activity-title">{activity.title}</h4>
                      <p className="activity-subtitle">{activity.subtitle}</p>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="progress-card">
              <div className="card-header">
                <span className="card-icon">
                  <FaChartLine />
                </span>
                <h3 className="card-title">Tiến độ học tập</h3>
              </div>
              <div className="progress-content">
                <div className="progress-text">
                  <span className="progress-label-title">Hoàn thành</span>
                  <span className="progress-percentage-profile">
                    {studentData.progress.completed}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${studentData.progress.completed}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="highlights-card">
              <div className="card-header">
                <span className="card-icon">
                  <FaStar />
                </span>
                <h3 className="card-title">Điểm nổi bật</h3>
              </div>
              <div className="highlights-content">
                <div className="highlight-item">
                  <span className="highlight-label">Điểm cao nhất</span>
                  <span className="highlight-value grade">
                    {studentData.highlights.highestGrade}
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-label">Môn yêu thích</span>
                  <span className="highlight-value subject">
                    {studentData.highlights.favoriteSubject}
                  </span>
                  clas{" "}
                </div>
                <div className="highlight-item">
                  <span className="highlight-label">Thứ hạng lớp</span>
                  <span className="highlight-value ranking">
                    {studentData.highlights.ranking}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "subjects" && (
        <div className="main-content-content-subjectCards">
          <SubjectCards />
        </div>
      )}
      {activeTab === "achievements" && (
        <div className="main-content-content-subjectCards">
          <Achievements />
        </div>
      )}
      {activeTab === "info" && (
        <div className="main-content-content-info">
          <PersonalInfo />
        </div>
      )}
      {activeTab === "settings" && (
        <div className="main-content-content-subjectCards">
          <AccountSettings />
        </div>
      )}
    </div>
  );
};

export default Profile;
