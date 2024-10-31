import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentUploadHome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [documents, setDocuments] = useState({});

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments({
      ...documents,
      [name]: files[0], // Assuming single file upload for simplicity
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your upload logic here
    alert('Documents submitted successfully!'); // Feedback for submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Required Documents</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role">Select your role:</label>
          <select id="role" value={role} onChange={handleRoleChange} required>
            <option value="">Select...</option>
            <option value="tour_guide">Tour Guide</option>
            <option value="advertiser">Advertiser</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {role && (
          <div>
            <h2>Upload Documents</h2>
            {role === 'tour_guide' && (
              <div>
                <label htmlFor="id">Upload ID:</label>
                <input
                  type="file"
                  id="id"
                  name="id"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="certificates">Upload Certificates:</label>
                <input
                  type="file"
                  id="certificates"
                  name="certificates"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
            {role === 'advertiser' && (
              <div>
                <label htmlFor="id">Upload ID:</label>
                <input
                  type="file"
                  id="id"
                  name="id"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="taxation_registry">Upload Taxation Registry Card:</label>
                <input
                  type="file"
                  id="taxation_registry"
                  name="taxation_registry"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
            {role === 'seller' && (
              <div>
                <label htmlFor="id">Upload ID:</label>
                <input
                  type="file"
                  id="id"
                  name="id"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="taxation_registry">Upload Taxation Registry Card:</label>
                <input
                  type="file"
                  id="taxation_registry"
                  name="taxation_registry"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
          </div>
        )}

        <button type="submit">Submit Documents</button>
      </form>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default DocumentUploadHome;
