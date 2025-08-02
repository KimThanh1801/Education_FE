import React from "react";
import "./CertificateCard.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const CertificateCard = ({ data, onDelete, onEdit }) => {
  return (
    <div className="certificate-card">
      <div className="cert-overlay">
        <button className="cert-btn" onClick={() => onEdit(data)}>
          <FaEdit />
        </button>
        <button className="cert-btn" onClick={() => onDelete(data.id)}>
          <FaTrashAlt />
        </button>
      </div>
      <div className="certificate-image-wrapper">
        {data.media_type === "image" ? (
          <img
            src={data.media_path_url}  
            alt={data.title}
            className="certificate-img"
          />
        ) : data.media_type === "video" ? (
          <video
            src={data.media_path_url}  
            controls
            className="certificate-img"
            style={{ objectFit: "cover" }}
          />
        ) : null}

      </div>

      <h3 className="certificate-title">{data.title}</h3>
      <p className="certificate-desc">{data.description}</p>
    </div>
  );
};

export default CertificateCard;