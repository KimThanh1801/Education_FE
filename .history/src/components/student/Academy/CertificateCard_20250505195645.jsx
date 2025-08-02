import React from "react";
import "./CertificateCard.css";

const CertificateCard = ({ data }) => {
  return (
    <div className="certificate-card">
      <img src={data.image} alt="Certificate" className="certificate-img" />
      <h3 className="certificate-title">{data.title}</h3>
      <p className="certificate-desc">{data.description}</p>
    </div>
  );
};

export default CertificateCard;
