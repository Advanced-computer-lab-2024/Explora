import React, { useState } from 'react';

const CompletedItineraries = () => {
  // Sample data for completed itineraries
  const [completedItineraries, setCompletedItineraries] = useState([
    {
      id: 1,
      name: 'Ancient Egypt Tour',
      tourGuide: 'John Doe',
      rating: null,
      comment: '',
    },
    {
      id: 2,
      name: 'Pyramids of Giza',
      tourGuide: 'Jane Smith',
      rating: null,
      comment: '',
    },
  ]);

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

  // Function to handle rating change
  const handleRatingChange = (id, rating) => {
    setCompletedItineraries((prevItineraries) =>
      prevItineraries.map((itinerary) =>
        itinerary.id === id ? { ...itinerary, rating: rating } : itinerary
      )
    );
  };

  // Function to handle comment change
  const handleCommentChange = (id, comment) => {
    setCompletedItineraries((prevItineraries) =>
      prevItineraries.map((itinerary) =>
        itinerary.id === id ? { ...itinerary, comment: comment } : itinerary
      )
    );
  };

  // Function to submit rating and comment
  const handleSubmit = (id) => {
    const itinerary = completedItineraries.find((item) => item.id === id);
    console.log('Rating and Comment Submitted:', {
      name: itinerary.name,
      rating: itinerary.rating,
      comment: itinerary.comment,
    });
    alert('Your rating and comment have been submitted!');
    // In a real application, here you would make an API call to save the data
  };

  return (
    <div>
      <h2>Completed Itineraries</h2>
      {completedItineraries.map((itinerary) => (
        <div key={itinerary.id} style={itineraryStyle}>
          <h3>{itinerary.name}</h3>
          <p>Tour Guide: {itinerary.tourGuide}</p>

          {/* Share buttons */}
          <button onClick={() => handleCopyLink(itinerary)} style={buttonStyle}>
            Copy Link
          </button>
          <button onClick={() => handleEmailShare(itinerary)} style={buttonStyle}>
            Share via Email
          </button>

          {/* Rating input */}
          <div style={{ marginTop: '10px' }}>
            <label>
              Rate this itinerary:
              <select
                value={itinerary.rating || ''}
                onChange={(e) => handleRatingChange(itinerary.id, e.target.value)}
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
          </div>

          {/* Comment input */}
          <div style={{ marginTop: '10px' }}>
            <label>
              Comment:
              <input
                type="text"
                value={itinerary.comment}
                onChange={(e) => handleCommentChange(itinerary.id, e.target.value)}
                style={inputStyle}
                placeholder="Add your comment here"
              />
            </label>
          </div>

          {/* Submit button for rating and comment */}
          <button
            onClick={() => handleSubmit(itinerary.id)}
            style={{ ...buttonStyle, marginTop: '10px' }}
          >
            Submit Rating & Comment
          </button>
        </div>
      ))}
    </div>
  );
};

// Basic styling for itinerary items and buttons
const itineraryStyle = {
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

const inputStyle = {
  marginLeft: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '3px',
  border: '1px solid #ccc',
};

export default CompletedItineraries;
