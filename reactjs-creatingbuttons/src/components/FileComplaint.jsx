import React, { useState } from 'react';

const FileComplaint = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Show an alert to indicate the complaint has been submitted
    alert('Your complaint has been submitted successfully!');
    // Clear the form fields
    setTitle('');
    setBody('');
    setDate('');
  };

  return (
    <header>
      <div className="file-complaint">
        <h2>File a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="body">Body (Problem):</label>
            <input
              type="text"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </header>
  );
};

export default FileComplaint;
