import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const FileComplaint = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    body: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = '67322cdfa472e2e7d22de84a'; // Example user ID
      const response = await axios.post(
        `http://localhost:4000/complaints/${userId}`,
        complaint,
        {
          headers: {
            'Content-Type': 'application/json', // Ensures the server receives JSON
          },
        }
      );

      // Check if the complaint was created successfully (HTTP status 201 for created)
      if (response.status === 201) {
        setMessage('Your complaint has been filed successfully!');
        setComplaint({ title: '', body: '', date: new Date().toISOString().slice(0, 10) });
      }
    } catch (err) {
      console.error('Error filing complaint:', err);
      setMessage('There was an error filing your complaint. Please try again later.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <FontAwesomeIcon icon={faCircleExclamation} size="lg" style={{ marginRight: '10px', color: '#008080' }} />
        <h2 style={titleStyle}>File a Complaint</h2>
      </div>
      <div style={formCardStyle}>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Title:</label>
            <input
              type="text"
              name="title"
              value={complaint.title}
              onChange={handleChange}
              placeholder="Enter complaint title"
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Problem:</label>
            <textarea
              name="body"
              value={complaint.body}
              onChange={handleChange}
              placeholder="Describe your issue"
              rows="4"
              required
              style={textareaStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Date:</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>Submit Complaint</button>
        </form>
        {message && <p style={feedbackMessageStyle}>{message}</p>}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const titleStyle = {
  margin: 0,
  color: '#333',
};

const formCardStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  display: 'block',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#008080', // Teal color for button
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  width: '100%',
};

const feedbackMessageStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#008080', // Teal color for feedback
  textAlign: 'center',
};

export default FileComplaint;
