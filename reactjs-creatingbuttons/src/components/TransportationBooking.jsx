import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample transportation data
const transportationOptions = [
  {
    id: 1,
    name: 'City Taxi',
    description: 'Convenient city taxi service available 24/7.',
    price: '15.00',
  },
  {
    id: 2,
    name: 'Airport Shuttle',
    description: 'Fast and reliable airport shuttle service.',
    price: '25.00',
  },
  {
    id: 3,
    name: 'Luxury Limousine',
    description: 'Travel in style with our luxury limousine service.',
    price: '100.00',
  },
  {
    id: 4,
    name: 'Public Bus',
    description: 'Affordable public bus service for city travel.',
    price: '2.00',
  },
];

export default function TransportationBooking() {
  const navigate = useNavigate();

  const handleBookNow = (option) => {
    // Here you would normally handle the booking logic or navigate to a booking details page
    alert(`Booking for ${option.name} confirmed!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        {transportationOptions.map((option) => (
          <div key={option.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{option.name}</h2>
            <p style={styles.cardDescription}>{option.description}</p>
            <p style={styles.cardPrice}>Price: ${option.price}</p>
            <button 
              style={styles.bookButton} 
              onClick={() => handleBookNow(option)}>
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
