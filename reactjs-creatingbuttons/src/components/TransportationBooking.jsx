import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Added import for axios

export default function TransportationBooking() {
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected transportation option
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to track modal visibility
  const navigate = useNavigate();
  const touristId = '6744bead2b0cf27c284554ad'; // Replace this with the actual tourist ID if dynamic

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

  const handlePayWithWallet = async () => {
    const bookingData = {
      touristId: touristId,
      transportationId: selectedOption._id, // Get the transportationId from the selected option
      seats: 1, // Number of seats (modify as needed)
    };

    try {
      const response = await fetch('http://localhost:4000/transportationBook/bookWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking ID: ${data._id}`);
        setIsPaymentModalOpen(false); // Close the modal after successful booking
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
    }
  };

  const handlePayWithCreditCard = async () => {
    try {
      // Create a Stripe Checkout session
      const response = await axios.post("http://localhost:4000/stripe/create-checkout-session", {
        itemName: selectedOption.name,
        itemPrice: selectedOption.price,
      });

      const sessionUrl = response.data.url; // URL to redirect to Stripe Checkout
      window.location.href = sessionUrl; // Redirect the user to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Failed to redirect to Stripe. Please try again.");
    }
  };

  const handleOpenModal = (option) => {
    setSelectedOption(option); // Set the selected option
    setIsPaymentModalOpen(true); // Open the payment modal
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false); // Close the modal
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
              onClick={() => handleOpenModal(option)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedOption && (
        <div style={styles.modal}>
          <h4>Payment Options</h4>
          <p>Transportation Method: {selectedOption.method}</p>
          <p>From: {selectedOption.origin}</p>
          <p>To: {selectedOption.destination}</p>
          <p>Amount to Pay: {selectedOption.currency} {selectedOption.price}</p>
          <button onClick={handlePayWithWallet} style={styles.bookButton}>
            Pay with Wallet
          </button>
          <button onClick={handlePayWithCreditCard} style={styles.creditButton}>
            Pay with Credit Card
          </button>
          <button onClick={handleCloseModal} style={styles.closeButton}>
            Close
          </button>
        </div>
      )}
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
  creditButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  closeButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    textAlign: 'center',
  },
};