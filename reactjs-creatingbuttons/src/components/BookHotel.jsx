import React, { useState } from 'react';

const BookHotel = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    try {
      const response = await fetch(`https://api.example.com/hotels?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      setHotels(data.hotels);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="book-hotel-container">
      <h1>Book a Hotel</h1>
      <div className="input-group">
        <label>
          Location
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Check-in Date
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </label>
        <label>
          Check-out Date
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </label>
        <label>
          Guests
          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search Hotels</button>
      </div>

      {error && <p className="error">{error}</p>}

      <h2>Available Hotels</h2>
      <ul className="hotel-list">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel-item">
            {hotel.name} - ${hotel.price} per night
          </li>
        ))}
      </ul>

      <style jsx>{`
        .book-hotel-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f7fa;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          color: #333;
        }

        h1 {
          font-size: 24px;
          color: #007bff;
          text-align: center;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          color: #555;
        }

        input[type="text"],
        input[type="date"],
        input[type="number"] {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.2s;
        }

        input:focus {
          border-color: #007bff;
          outline: none;
        }

        button {
          padding: 12px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: #0056b3;
        }

        .error {
          color: #d9534f;
          text-align: center;
          margin-top: 10px;
        }

        h2 {
          font-size: 20px;
          color: #555;
          margin-top: 30px;
          text-align: center;
        }

        .hotel-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .hotel-item {
          background: #e9ecef;
          margin: 10px 0;
          padding: 15px;
          border-radius: 4px;
          font-size: 16px;
          color: #333;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default BookHotel;
