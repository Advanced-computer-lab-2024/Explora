import React, { useState } from 'react';

const CompletedItineraries = () => {
  // Sample data for completed itineraries
  const [itineraries, setItineraries] = useState([
    { id: 1, name: 'Historical Egypt Tour', tourGuide: 'John Doe', rating: null, comment: '' },
    { id: 2, name: 'Beach and Relaxation', tourGuide: 'Jane Smith', rating: null, comment: '' },
    // Add more itineraries as needed
  ]);

  // Handle rating change
  const handleRatingChange = (id, newRating) => {
    setItineraries(itineraries.map(itinerary => 
      itinerary.id === id ? { ...itinerary, rating: newRating } : itinerary
    ));
  };

  // Handle comment change
  const handleCommentChange = (id, newComment) => {
    setItineraries(itineraries.map(itinerary => 
      itinerary.id === id ? { ...itinerary, comment: newComment } : itinerary
    ));
  };

  // Handle form submission (e.g., save the rating and comment)
  const handleSubmit = (id) => {
    const itinerary = itineraries.find(itinerary => itinerary.id === id);
    console.log(`Saved for itinerary "${itinerary.name}":`, {
      rating: itinerary.rating,
      comment: itinerary.comment
    });
    // You can add logic to save the data to a backend or API
  };

  return (
    <div>
      <h2>Completed Itineraries</h2>
      {itineraries.map(itinerary => (
        <div key={itinerary.id} style={itineraryStyle}>
          <h3>{itinerary.name}</h3>
          <p>Tour Guide: {itinerary.tourGuide}</p>

          {/* Rating Input */}
          <label>
            Rate this itinerary:
            <select
              value={itinerary.rating || ''}
              onChange={(e) => handleRatingChange(itinerary.id, e.target.value)}
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </label>

          {/* Comment Input */}
          <label>
            Comment:
            <textarea
              value={itinerary.comment}
              onChange={(e) => handleCommentChange(itinerary.id, e.target.value)}
              placeholder="Write your comment here"
              style={textareaStyle}
            />
          </label>

          {/* Submit Button */}
          <button onClick={() => handleSubmit(itinerary.id)} style={buttonStyle}>
            Save Rating & Comment
          </button>
        </div>
      ))}
    </div>
  );
};

// Styling for the itinerary containers
const itineraryStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px'
};

// Styling for the text area
const textareaStyle = {
  display: 'block',
  width: '100%',
  padding: '5px',
  marginTop: '5px',
  marginBottom: '10px',
  borderRadius: '5px'
};

// Styling for the submit button
const buttonStyle = {
  padding: '5px 10px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '10px'
};

export default CompletedItineraries;
