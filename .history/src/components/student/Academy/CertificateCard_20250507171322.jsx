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

      {/* Hiển thị ảnh hoặc video tùy loại */}
      {data.mediaType === "image" ? (
        <img
          src={data.mediaUrl}
          alt="Certificate"
          className="certificate-img"
        />
      ) : data.mediaType === "video" ? (
        <video
          src={data.mediaUrl}
          controls
          className="certificate-img"
          style={{ objectFit: "cover" }}
        />
      ) : null}

      <h3 className="certificate-title">{data.title}</h3>
      <p className="certificate-desc">{data.description}</p>
    </div>
  );
};

export default CertificateCard;
