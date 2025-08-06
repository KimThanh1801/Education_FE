import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const studentData = {
    name: 'Nguyễn Văn An',
    major: 'Công nghệ Thông tin',
    year: 'Năm 3',
    studentId: 'MSSV: 2021001234',
    enrollDate: 'Nhập học: 1/9/2021',
    gpa: '3.75',
    subjects: '4',
    achievements: '3',
    avatar: '/student-avatar.png',
    activities: [
      {
        title: 'Hoàn thành bài tập',
        subtitle: 'Lập trình Web',
        time: '2 giờ trước',
        icon: '📝',
        color: '#4F46E5'
      },
      {
        title: 'Tham gia thảo luận',
        subtitle: 'Cơ sở dữ liệu',
        time: '5 giờ trước',
        icon: '💬',
        color: '#059669'
      },
      {
        title: 'Nộp báo cáo',
        subtitle: 'Mạng máy tính',
        time: '1 ngày trước',
        icon: '📄',
        color: '#DC2626'
      },
      {
        title: 'Đăng ký môn học mới',
        subtitle: 'Trí tuệ nhân tạo',
        time: '2 ngày trước',
        icon: '➕',
        color: '#7C3AED'
      }
    ],
    progress: {
      completed: 75,
      total: 100
    },
    highlights: {
      highestGrade: 'A+',
      favoriteSubject: 'Lập trình Web',
      ranking: 'Top 5'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: '⚡' },
    { id: 'subjects', label: 'Môn học', icon: '📚' },
    { id: 'achievements', label: 'Thành tích', icon: '🏆' },
    { id: 'info', label: 'Thông tin', icon: '📋' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
  ];

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="profile-main-info">
            <div className="avatar-container">
              <img 
                src={studentData.avatar || "/placeholder.svg?height=80&width=80&query=student avatar"} 
                alt={studentData.name} 
                className="profile-avatar"
              />
              <div className="camera-icon">📷</div>
            </div>
            
            <div className="basic-info">
              <div className="name-section">
                <h1 className="student-name">{studentData.name}</h1>
                <span className="status-badge">Đang học</span>
              </div>
              <p className="student-major">{studentData.major} • {studentData.year}</p>
              <div className="student-details">
                <span className="detail-item">👤 {studentData.studentId}</span>
                <span className="detail-item">📅 {studentData.enrollDate}</span>
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
              <div className="stat-number achievements">{studentData.achievements}</div>
              <div className="stat-label">Thành tích</div>
            </div>
          </div>

          <button className="edit-button">
            ✏️ Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
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
                    <div className="activity-icon" style={{ backgroundColor: activity.color }}>
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
                <span className="card-icon">📈</span>
                <h3 className="card-title">Tiến độ học tập</h3>
              </div>
              <div className="progress-content">
                <div className="progress-text">
                  <span className="progress-label">Hoàn thành</span>
                  <span className="progress-percentage">{studentData.progress.completed}%</span>
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
                <span className="card-icon">⭐</span>
                <h3 className="card-title">Điểm nổi bật</h3>
              </div>
              <div className="highlights-content">
                <div className="highlight-item">
                  <span className="highlight-label">Điểm cao nhất</span>
                  <span className="highlight-value grade">{studentData.highlights.highestGrade}</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-label">Môn yêu thích</span>
                  <span className="highlight-value subject">{studentData.highlights.favoriteSubject}</span>clas              </div>
                <div className="highlight-item">
                  <span className="highlight-label">Thứ hạng lớp</span>
                  <span className="highlight-value ranking">{studentData.highlights.ranking}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
