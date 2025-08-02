import AchievementSection from "../../../components/student/Academy/AchievementSection";


import React, { useState, useEffect } from "react";
import CertificateList from "../../../components/student/Academy/CertificateList";
import AddCertificateForm from "./AddCertificateForm";

function App() {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("certificates");
    if (saved) {
      setCertificates(JSON.parse(saved));
    }
  }, []);

  const addCertificate = (newCert) => {
    const updated = [...certificates, newCert];
    setCertificates(updated);
    localStorage.setItem("certificates", JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Academy achievements</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-2xl px-4 py-2 bg-orange-400 text-white rounded-full"
        >
          +
        </button>
      </div>

      {showForm && <AddCertificateForm onAdd={addCertificate} />}

      <CertificateList certificates={certificates} />
    </div>
  );
}

export default App;
