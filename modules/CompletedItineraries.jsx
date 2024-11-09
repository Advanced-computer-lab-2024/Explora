import React, { useState } from 'react';

const CompletedItineraries = () => {
  // Sample data for completed itineraries
  const completedItineraries = [
    {
      id: 1,
      name: 'Egypt Historical Tour',
      tourGuide: 'Ahmed',
    },
    {
      id: 2,
      name: 'Pyramids and Nile Adventure',
      tourGuide: 'Sarah',
    },
  ];

  // State for storing ratings and comments
  const [itineraryFeedback, setItineraryFeedback] = useState({});
  const [guideFeedback, setGuideFeedback] = useState({});

  // Handle tour guide rating and comment changes
  const handleGuideFeedbackChange = (id, field, value) => {
    setGuideFeedback({
      ...guideFeedback,
      [id]: {
        ...guideFeedback[id],
        [field]: value,
      },
    });
  };

  // Handle itinerary rating and comment changes
  const handleItineraryFeedbackChange = (id, field, value) => {
    setItineraryFeedback({
      ...itineraryFeedback,
      [id]: {
        ...itineraryFeedback[id],
        [field]: value,
      },
    });
  };

  // Handle submission of feedback
  const handleSubmitFeedback = (type, id) => {
    const feedback = type === 'guide' ? guideFeedback[id] : itineraryFeedback[id];
    console.log(`${type === 'guide' ? 'Tour Guide' : 'Itinerary'} Feedback for ID ${id}:`, feedback);
    alert(`${type === 'guide' ? 'Tour Guide' : 'Itinerary'} feedback submitted successfully!`);
  };

  // Function to copy the itinerary link to clipboard
  const handleCopyLink = (itinerary) => {
    const link = `${window.location.origin}/itinerary/${itinerary.id}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied to clipboard: ${link}`);
  };

  // Function to open email client with pre-filled content
  const handleEmailShare = (itinerary) => {
    const link = `${window.location.origin}/itinerary/${itinerary.id}`;
    const subject = `Check out this itinerary: ${itinerary.name}`;
    const body = `Hi,\n\nI wanted to share this amazing itinerary with you: ${itinerary.name}. You can view it here: ${link}\n\nBest regards!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <h2>Completed Itineraries</h2>
      {completedItineraries.map((itinerary) => (
        <div key={itinerary.id} style={itineraryStyle}>
          <h3>{itinerary.name}</h3>
          <h4>Tour Guide: {itinerary.tourGuide}</h4>

          {/* Tour Guide Rating and Comment */}
          <div style={feedbackSectionStyle}>
            <h5>Rate and Comment on Tour Guide</h5>
            <label>
              Rating:
              <select
                value={guideFeedback[itinerary.id]?.rating || ''}
                onChange={(e) => handleGuideFeedbackChange(itinerary.id, 'rating', e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </label>
            <label>
              Comment:
              <textarea
                value={guideFeedback[itinerary.id]?.comment || ''}
                onChange={(e) => handleGuideFeedbackChange(itinerary.id, 'comment', e.target.value)}
                style={textareaStyle}
              />
            </label>
            <button onClick={() => handleSubmitFeedback('guide', itinerary.id)} style={buttonStyle}>
              Submit Guide Feedback
            </button>
          </div>

          {/* Itinerary Rating and Comment */}
          <div style={feedbackSectionStyle}>
            <h5>Rate and Comment on Itinerary</h5>
            <label>
              Rating:
              <select
                value={itineraryFeedback[itinerary.id]?.rating || ''}
                onChange={(e) => handleItineraryFeedbackChange(itinerary.id, 'rating', e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </label>
            <label>
              Comment:
              <textarea
                value={itineraryFeedback[itinerary.id]?.comment || ''}
                onChange={(e) => handleItineraryFeedbackChange(itinerary.id, 'comment', e.target.value)}
                style={textareaStyle}
              />
            </label>
            <button onClick={() => handleSubmitFeedback('itinerary', itinerary.id)} style={buttonStyle}>
              Submit Itinerary Feedback
            </button>
          </div>

          {/* Share buttons */}
          <div style={shareSectionStyle}>
            <button onClick={() => handleCopyLink(itinerary)} style={buttonStyle}>
              Copy Link
            </button>
            <button onClick={() => handleEmailShare(itinerary)} style={buttonStyle}>
              Share via Email
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Basic styling for itinerary items, buttons, and input fields
const itineraryStyle = {
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const feedbackSectionStyle = {
  marginTop: '15px',
  marginBottom: '15px',
};

const shareSectionStyle = {
  marginTop: '10px',
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

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  display: 'block',
  width: '100%',
  height: '60px',
  marginBottom: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default CompletedItineraries;
