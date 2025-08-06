import React from 'react';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Học sinh xuất sắc',
      description: 'Đạt GPA 3.5+ trong 2 học kỳ liên tiếp',
      date: '15/1/2024',
      icon: '🏆',
      iconBg: '#f59e0b',
      iconColor: '#ffffff'
    },
    {
      id: 2,
      title: 'Hoàn thành khóa học AI',
      description: 'Hoàn thành khóa học Machine Learning cơ bản',
      date: '20/2/2024',
      icon: '📚',
      iconBg: '#3b82f6',
      iconColor: '#ffffff'
    },
    {
      id: 3,
      title: 'Tham gia dự án nhóm',
      description: 'Tham gia thành công dự án phát triển web',
      date: '10/3/2024',
      icon: '🎯',
      iconBg: '#10b981',
      iconColor: '#ffffff'
    }
  ];

  return (
    <div className="achievements-container">
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-content">
              <div 
                className="achievement-icon"
                style={{ 
                  backgroundColor: achievement.iconBg,
                  color: achievement.iconColor 
                }}
              >
                {achievement.icon}
              </div>
              
              <div className="achievement-info">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <div className="achievement-date">
                  <span className="date-icon">📅</span>
                  <span className="date-text">{achievement.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
