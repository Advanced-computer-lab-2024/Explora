import React, { useState } from 'react';

const BookFlight = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError(''); // Reset error state
    try {
      const response = await fetch(`https://api.example.com/flights?departure=${departure}&destination=${destination}&date=${date}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      setFlights(data.flights); // Adjust according to the API response structure
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="book-flight-container">
      <h1>Book a Flight</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search Flights</button>
      </div>

      {error && <p className="error">{error}</p>}

      <h2>Available Flights</h2>
      <ul className="flight-list">
        {flights.map((flight) => (
          <li key={flight.id} className="flight-item">
            {flight.name} - ${flight.price}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .book-flight-container {
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
          color: #000000;
          text-align: center;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        input[type="text"],
        input[type="date"] {
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
          background-color: #000000;
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

        .flight-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .flight-item {
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

export default BookFlight;
