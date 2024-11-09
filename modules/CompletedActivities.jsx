import React, { useState } from 'react';

const CompletedActivities = () => {
  // Sample data for completed activities
  const initialCompletedActivities = [
    {
      id: 1,
      name: 'Visit the Pyramids of Giza',
      rating: 0,
      comment: '',
    },
    {
      id: 2,
      name: 'Explore the Egyptian Museum',
      rating: 0,
      comment: '',
    },
    {
      id: 3,
      name: 'Nile River Cruise',
      rating: 0,
      comment: '',
    },
  ];

  const [completedActivities, setCompletedActivities] = useState(initialCompletedActivities);

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

  // Handle rating change
  const handleRatingChange = (id, newRating) => {
    setCompletedActivities(completedActivities.map(activity =>
      activity.id === id ? { ...activity, rating: newRating } : activity
    ));
  };

  // Handle comment change
  const handleCommentChange = (id, newComment) => {
    setCompletedActivities(completedActivities.map(activity =>
      activity.id === id ? { ...activity, comment: newComment } : activity
    ));
  };

  // Handle feedback submission
  const handleSubmitFeedback = (activity) => {
    console.log(`Feedback submitted for ${activity.name}:`, {
      rating: activity.rating,
      comment: activity.comment,
    });
    alert(`Feedback for "${activity.name}" submitted successfully!`);
  };

  return (
    <div>
      <h2>Completed Activities</h2>
      {completedActivities.map((activity) => (
        <div key={activity.id} style={activityStyle}>
          <h3>{activity.name}</h3>

          {/* Rating Selection */}
          <div style={{ marginTop: '10px' }}>
            <label>
              Rate this activity:
              <select
                value={activity.rating}
                onChange={(e) => handleRatingChange(activity.id, parseInt(e.target.value))}
                style={selectStyle}
              >
                <option value="0">Select a rating</option>
                <option value="1">Poor</option>
                <option value="2">Fair</option>
                <option value="3">Good</option>
                <option value="4">Very Good</option>
                <option value="5">Excellent</option>
              </select>
            </label>
          </div>

          {/* Comment Section */}
          <div style={{ marginTop: '10px' }}>
            <label>
              Comment:
              <textarea
                value={activity.comment}
                onChange={(e) => handleCommentChange(activity.id, e.target.value)}
                placeholder="Add your comment here"
                style={textareaStyle}
              />
            </label>
          </div>

          {/* Submit Feedback Button */}
          <button onClick={() => handleSubmitFeedback(activity)} style={buttonStyle}>
            Submit Feedback
          </button>

          {/* Share buttons */}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleCopyLink(activity)} style={buttonStyle}>
              Copy Link
            </button>
            <button onClick={() => handleEmailShare(activity)} style={buttonStyle}>
              Share via Email
            </button>
          </div>
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

const selectStyle = {
  marginLeft: '10px',
  padding: '5px',
  fontSize: '14px',
};

const textareaStyle = {
  display: 'block',
  marginTop: '5px',
  padding: '5px',
  width: '100%',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default CompletedActivities;
