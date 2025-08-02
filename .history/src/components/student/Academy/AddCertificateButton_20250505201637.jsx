import { useRef } from 'react';

const AddCertificateButton = ({ onAdd }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newCert = {
      id: Date.now(),
      title: 'My Certificate',
      description: "This is my certificate. I'm very proud of my certificate. It's a proof for my effort.",
      image: imageUrl,
    };

    onAdd(newCert);
  };

  return (
    <>
      <button className="add-btn" onClick={() => fileInputRef.current.click()}>+</button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default AddCertificateButton;