import React, { useState } from 'react';

export default function DocumentUpload() {
  const [role, setRole] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [taxCardFile, setTaxCardFile] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add your file upload logic here (e.g., form data submission)
    console.log("Role:", role);
    console.log("ID File:", idFile);
    console.log("Certificate File:", certificateFile);
    console.log("Tax Card File:", taxCardFile);

    // Handle the form submission as needed
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Upload Required Documents</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            Select Role:
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">-- Select Role --</option>
              <option value="tour_guide">Tour Guide</option>
              <option value="advertiser">Advertiser</option>
              <option value="seller">Seller</option>
            </select>
          </label>
        </div>

        {/* ID Upload */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Upload ID:
            <input 
              type="file" 
              accept="image/*,application/pdf" 
              onChange={(e) => handleFileChange(e, setIdFile)} 
              required 
              style={{ display: 'block', marginTop: '5px' }}
            />
          </label>
        </div>

        {/* Conditional Document Uploads */}
        {role === 'tour_guide' && (
          <div style={{ marginBottom: '15px' }}>
            <label>
              Upload Certificate:
              <input 
                type="file" 
                accept="image/*,application/pdf" 
                onChange={(e) => handleFileChange(e, setCertificateFile)} 
                required 
                style={{ display: 'block', marginTop: '5px' }}
              />
            </label>
          </div>
        )}

        {(role === 'advertiser' || role === 'seller') && (
          <div style={{ marginBottom: '15px' }}>
            <label>
              Upload Taxation Registry Card:
              <input 
                type="file" 
                accept="image/*,application/pdf" 
                onChange={(e) => handleFileChange(e, setTaxCardFile)} 
                required 
                style={{ display: 'block', marginTop: '5px' }}
              />
            </label>
          </div>
        )}

        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Submit Documents
        </button>
      </form>
    </div>
  );
}
