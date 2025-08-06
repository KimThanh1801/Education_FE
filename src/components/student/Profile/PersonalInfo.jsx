import React from 'react';
import './PersonalInfo.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap, FaUserGraduate } from 'react-icons/fa';

const PersonalInfo = () => {
  const personalData = {
    email: 'nguyenvanan@student.edu.vn',
    phone: '+84 123 456 789',
    birthDate: '15/5/2002',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    major: 'Công nghệ Thông tin',
    year: 'Năm 3'
  };

  const infoItems = [
    {
      id: 1,
      label: 'Email',
      value: personalData.email,
      icon: <FaEnvelope />,
      iconColor: '#3b82f6'
    },
    {
      id: 2,
      label: 'Số điện thoại',
      value: personalData.phone,
      icon: <FaPhone />,
      iconColor: '#10b981'
    },
    {
      id: 3,
      label: 'Ngày sinh',
      value: personalData.birthDate,
      icon: <FaBirthdayCake />,
      iconColor: '#8b5cf6'
    },
    {
      id: 4,
      label: 'Địa chỉ',
      value: personalData.address,
      icon: <FaMapMarkerAlt />,
      iconColor: '#ef4444'
    },
    {
      id: 5,
      label: 'Chuyên ngành',
      value: personalData.major,
      icon: <FaGraduationCap />,
      iconColor: '#8b5cf6'
    },
    {
      id: 6,
      label: 'Năm học',
      value: personalData.year,
      icon: <FaUserGraduate />,
      iconColor: '#f59e0b'
    }
  ];

  return (
    <div className="personal-info-container">
      <div className="personal-info-card">
        <h2 className="section-title">Thông tin cá nhân</h2>

        <div className="info-grid">
          {infoItems.map((item) => (
            <div key={item.id} className="info-item">
              <div className="info-content">
                <div
                  className="info-icon"
                  style={{ color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div className="info-text-info">
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
