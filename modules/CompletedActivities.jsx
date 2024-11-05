import React, { useState } from 'react';

const CompletedActivities = () => {
  // Sample data for completed activities
  const completedActivities = [
    {
      id: 1,
      name: 'Visit the Pyramids of Giza',
    },
    {
      id: 2,
      name: 'Explore the Egyptian Museum',
    },
    {
      id: 3,
      name: 'Nile River Cruise',
    },
  ];

  // Function to copy the activity link to clipboard
  const handleCopyLink = (activity) => {
    const link = `${window.location.origin}/activity/${activity.id}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied to clipboard: ${link}`);
  };

  // Function to open email client with pre-filled content
  const handleEmailShare = (activity) => {
    const link = `${window.location.origin}/activity/${activity.id}`;
    const subject = `Check out this activity: ${activity.name}`;
    const body = `Hi,\n\nI wanted to share this amazing activity with you: ${activity.name}. You can view it here: ${link}\n\nBest regards!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <h2>Completed Activities</h2>
      {completedActivities.map((activity) => (
        <div key={activity.id} style={activityStyle}>
          <h3>{activity.name}</h3>

          {/* Share buttons */}
          <button onClick={() => handleCopyLink(activity)} style={buttonStyle}>
            Copy Link
          </button>
          <button onClick={() => handleEmailShare(activity)} style={buttonStyle}>
            Share via Email
          </button>
        </div>
      ))}
    </div>
  );
};

// Basic styling for activity items and buttons
const activityStyle = {
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  margin: '5px',
  padding: '8px 15px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
};

export default CompletedActivities;
