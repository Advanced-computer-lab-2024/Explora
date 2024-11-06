import React, { useState } from 'react';

const AccountDeletionRequest = () => {
  const [email, setEmail] = useState('');
  const [deletionReason, setDeletionReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!confirmation) {
      setMessage('Please confirm the deletion request.');
      return;
    }

    // Placeholder for backend request handling
    console.log('Account deletion requested for email:', email);
    console.log('Reason for deletion:', deletionReason);
    console.log('Additional comments:', additionalComments);

    setMessage('Your account deletion request has been submitted.');
    setEmail('');
    setDeletionReason('');
    setAdditionalComments('');
    setConfirmation(false);
  };

  return (
    <header>
    <div className="account-deletion-request-container">
      <h2>Request Account Deletion</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Deletion Reason Dropdown */}
        <label>
          Reason for Deletion:
          <select
            value={deletionReason}
            onChange={(e) => setDeletionReason(e.target.value)}
            required
          >
            <option value="" disabled>Select a reason</option>
            <option value="Privacy concerns">Privacy concerns</option>
            <option value="Too many notifications">Too many notifications</option>
            <option value="Not using the account">Not using the account</option>
            <option value="Prefer another platform">Prefer another platform</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Additional Comments Text Area */}
        <label>
          Additional Comments (Optional):
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Let us know if there's anything else you'd like to share."
          />
        </label>

        {/* Confirmation Checkbox */}
        <label>
          <input
            type="checkbox"
            checked={confirmation}
            onChange={(e) => setConfirmation(e.target.checked)}
            required
          />
          I confirm that I want to delete my account and all related data.
        </label>

        {/* Submit Button */}
        <button type="submit">Submit Request</button>
      </form>
      
      {/* Feedback Message */}
      {message && <p>{message}</p>}
    </div>
    </header>
  );
};

export default AccountDeletionRequest;
