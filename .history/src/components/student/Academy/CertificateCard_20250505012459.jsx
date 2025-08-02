import './CertificateCard.css';

const CertificateCard = ({ title, description, image }) => {
  return (
    <div className="certificate-card">
      <img src={image} alt="Certificate" className="cert-img" />
      <h4 className="cert-title">{title}</h4>
      <p className="cert-desc">{description}</p>
    </div>
  );
};

export default CertificateCard;
