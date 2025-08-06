import React from 'react';
import './SubjectCards.css';

const SubjectCards = () => {
  const subjects = [
    {
      id: 1,
      name: 'Lập trình Web',
      status: 'Hoàn thành',
      statusColor: 'completed',
      grade: 'A',
      progress: 85
    },
    {
      id: 2,
      name: 'Cơ sở dữ liệu',
      status: 'Đang học',
      statusColor: 'studying',
      grade: 'B+',
      progress: 70
    },
    {
      id: 3,
      name: 'Mạng máy tính',
      status: 'Đang học',
      statusColor: 'studying',
      grade: '-',
      progress: 45
    },
    {
      id: 4,
      name: 'Trí tuệ nhân tạo',
      status: 'Sắp học',
      statusColor: 'upcoming',
      grade: '-',
      progress: 0
    }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A':
        return '#3b82f6'; // Blue
      case 'B+':
        return '#8b5cf6'; // Violet
      case '-':
      default:
        return '#6b7280'; // Gray
    }
  };

  return (
    <div className="subjects-container">
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-card">
            <div className="card-header">
              <div className="subject-info">
                <h3 className="subject-name">{subject.name}</h3>
                <span className={`status-badge ${subject.statusColor}`}>
                  {subject.status}
                </span>
              </div>
              <div className="grade-section">
                <div 
                  className="grade-value"
                  style={{ color: getGradeColor(subject.grade) }}
                >
                  {subject.grade}
                </div>
                <div className="grade-label">Điểm</div>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Tiến độ</span>
                <span className="progress-percentage">{subject.progress}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-background">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectCards;
