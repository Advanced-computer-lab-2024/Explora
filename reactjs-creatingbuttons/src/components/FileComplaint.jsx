import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported

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
    <div className="file-complaint-container">
      <div className="complaint-card">
        <h2>File a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={complaint.title}
              onChange={handleChange}
              placeholder="Enter complaint title"
              required
            />
          </div>
          <div className="form-group">
            <label>Problem:</label>
            <textarea
              name="body"
              value={complaint.body}
              onChange={handleChange}
              placeholder="Describe your issue"
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={complaint.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit Complaint</button>
        </form>
        {message && <p className="feedback-message">{message}</p>}
      </div>
    </div>
  );
};

export default FileComplaint;