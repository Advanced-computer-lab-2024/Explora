import React, { useState } from 'react';
import axios from 'axios';

const EmailReminder = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Event Reminder');
  const [message, setMessage] = useState('This is a reminder for your upcoming event.');
  const [status, setStatus] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/send-reminder', { email, subject, message });
      setStatus('Email sent successfully!');
    } catch (err) {
      setStatus('Failed to send email.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Send Email Reminder</h2>
      <form onSubmit={sendEmail}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EmailReminder;
