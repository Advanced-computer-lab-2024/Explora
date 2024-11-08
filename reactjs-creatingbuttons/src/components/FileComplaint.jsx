import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaint);
    setMessage('Your complaint has been filed successfully!');
    setComplaint({ title: '', body: '', date: new Date().toISOString().slice(0, 10) });
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