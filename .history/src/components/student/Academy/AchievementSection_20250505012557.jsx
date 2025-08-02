import { useState, useEffect } from 'react';
import CertificateCard from './CertificateCard';
import AddCertificateButton from './AddCertificateButton';
import './AchievementSection.css';
import data from '../data/certificates.json';

const AchievementSection = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    setCertificates(data);
  }, []);

  const handleAdd = (cert) => {
    setCertificates(prev => [...prev, cert]);
    // Có thể thêm logic ghi vào file backend hoặc localStorage nếu muốn
  };

  return (
    <div className="achievement-wrapper">
      <div className="achievement-header">
        <h2>Academy achievements</h2>
        <AddCertificateButton onAdd={handleAdd} />
      </div>
      <div className="cert-grid">
        {certificates.map(cert => (
          <CertificateCard key={cert.id} {...cert} />
        ))}
      </div>
    </div>
  );
};

export default AchievementSection;
