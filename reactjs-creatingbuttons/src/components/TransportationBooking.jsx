import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransportationBooking() {
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const touristId = '67322cdfa472e2e7d22de84a'; // Replace this with the actual tourist ID if dynamic

  useEffect(() => {
    const fetchTransportationOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/transportation/');
        const data = await response.json();

        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setTransportationOptions(data);
        } else {
          console.error('Expected data to be an array, but got:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transportation options:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTransportationOptions();
  }, []);

  const handleBookNow = async (option) => {
    const bookingData = {
      touristId: touristId,
      transportationId: option._id, // Get the transportationId directly from option
      seats: 1, // Number of seats (modify as needed)
    };

    try {
      const response = await fetch('http://localhost:4000/transportationBook/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking ID: ${data._id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        {transportationOptions.map((option) => (
          <div key={option._id} style={styles.card}>
            <h2 style={styles.cardTitle}>{option.method}</h2>
            <p style={styles.cardDescription}>From: {option.origin} To: {option.destination}</p>
            <p style={styles.cardTime}>Date: {new Date(option.date).toLocaleDateString()}</p>
            <p style={styles.cardTime}>Time: {option.time}</p>
            <p style={styles.cardPrice}>Price: {option.currency} {option.price}</p>
            <button
              style={styles.bookButton}
              onClick={() => handleBookNow(option)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '20px',
    margin: '10px 0',
  },
  cardDescription: {
    color: '#555',
    fontSize: '14px',
  },
  cardTime: {
    color: '#777',
    fontSize: '13px',
  },
  cardPrice: {
    fontWeight: 'bold',
    margin: '10px 0',
  },
  bookButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
