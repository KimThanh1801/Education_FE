import React from "react";

const CertificateList = ({ certificates }) => {
  if (certificates.length === 0) {
    return <p className="text-gray-500">No certificates yet. Click + to add one.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {certificates.map((cert, index) => (
        <div
          key={index}
          className="p-4 border rounded-xl shadow-sm text-center bg-white"
        >
          <img src={cert.image} alt="Certificate" className="w-full mb-2 rounded" />
          <h4 className="font-semibold text-lg">{cert.name}</h4>
          <p className="text-sm text-gray-600">{cert.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CertificateList;
