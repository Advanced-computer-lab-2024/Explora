import React, { useState } from 'react';

export default function UploadImagePage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    // You can add logic here to upload the image to the server.
    alert('Image uploaded successfully!');
  };

  return (
    <div className="upload-image-container">
      <h2>Upload Photo</h2>
      
      <div className="image-preview">
        {image ? (
          <img src={image} alt="Preview" className="image-preview-img" />
        ) : (
          <p>No image selected</p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input"
      />

      <button onClick={handleUpload} className="upload-button">
        Upload Image
      </button>
    </div>
  );
}
