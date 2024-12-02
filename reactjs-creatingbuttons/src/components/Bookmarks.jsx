import React, { useState } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      type: 'Event',
      name: 'Music Festival',
      description: 'A fun music event with various artists performing live.',
    },
    {
      id: 2,
      type: 'Itinerary',
      name: 'Weekend Getaway',
      description: 'A well-planned 3-day trip to the mountains.',
    },
    {
      id: 3,
      type: 'Activity',
      name: 'Cooking Class',
      description: 'Learn how to cook Italian cuisine with a professional chef.',
    },
    {
      id: 4,
      type: 'Event',
      name: 'Art Exhibition',
      description: 'Explore the work of contemporary artists at the local gallery.',
    },
  ]);

  
  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1>Bookmarks</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{bookmark.type}: {bookmark.name}</h3>
            <p>{bookmark.description}</p>
            <button
              style={buttonStyle}
              onClick={() => handleDelete(bookmark.id)}
            >
              Delete Bookmark
            </button>
          </div>
        ))}
        {bookmarks.length === 0 && <p>No bookmarks available.</p>}
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px 0',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f44336',
  color: '#fff',
};

export default Bookmarks;
