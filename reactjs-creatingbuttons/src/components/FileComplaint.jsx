import React, { useState } from 'react';

const FileComplaint = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    body: '',
    date: new Date().toISOString().slice(0, 10),  // Default to current date
  });
  const [message, setMessage] = useState('');  // Feedback message for user

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for backend submission or local processing
    console.log('Complaint submitted:', complaint);
    setMessage('Your complaint has been filed successfully!');
    setComplaint({ title: '', body: '', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <header>
    <div className="file-complaint-container">
      <h2>File a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={complaint.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Problem:
          <input
            type="text"
            name="body"
            value={complaint.body}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={complaint.date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Complaint</button>
      </form>
      {message && <p>{message}</p>}  {/* Display feedback message */}
    </div>
    </header>
  );
};

export default FileComplaint;
