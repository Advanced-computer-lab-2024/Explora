import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewCartTourist = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //const touristId = "67322cdfa472e2e7d22de84a";
  const navigate = useNavigate();
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage

  // Function to fetch cart details
  useEffect(() => {
    const fetchCart = async () => {
      const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage
      if (!touristId) {
        setError('User not logged in. Please log in first.');
          return;
      }
      try {
        const response = await axios.get(`http://localhost:4000/cart/${touristId}`);

        console.log("API Response:", response.data);

        if (response.data && response.data.cartItems && Array.isArray(response.data.cartItems)) {
          setCartItems(response.data.cartItems);
          setTotalPrice(response.data.totalPrice || 0); // Set total price from backend or calculate locally
        } else {
          console.error("Cart items are not available in the response.");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // Handle removing an item
  const handleRemove = async (productId) => {
    try {
      // Send DELETE request to the backend with productId in the request body
      const response = await axios.delete(`http://localhost:4000/cart/remove/${touristId}`, {
        data: { productId }, // Send productId in the request body
      });
  
      if (response.status === 200) {
        // Remove the item from the local state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== productId)
        );
        console.log("Item removed successfully");
      } else {
        console.error("Failed to remove item:", response.data);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Handle quantity changes
  const handleQuantityChange = async (id, amount) => {
    // Update the local state with the new quantity
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.productId._id === id
          ? { 
              ...item, 
              quantity: Math.max(1, item.quantity + amount),
              itemPrice: (item.quantity + amount) * item.productId.price  // Update item price
            }
          : item
      );
  
      // Recalculate the total price
      const newTotalPrice = updatedItems.reduce((total, item) => total + item.itemPrice, 0);
      setTotalPrice(newTotalPrice);
  
      return updatedItems;
    });
  
    try {
      // Find the updated item in the cart
      const itemToUpdate = cartItems.find(item => item.productId._id === id);
  
      // Send updated quantity to backend
      const response = await axios.put(
        `http://localhost:4000/cart/update/${touristId}`,
        {
          productId: id,
          quantity: itemToUpdate.quantity + amount,
        }
      );
  
      console.log("Quantity updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={styles.container}>
            <button
        onClick={() => navigate(-1)} // Use navigate to go back
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

      <h2 style={styles.heading}>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div style={styles.cartItems}>
          
          {cartItems.map((item) => {
            const imageUrl = "http://localhost:4000/" + item.productId.image;
            return (
              <div key={item.productId._id} style={styles.cartItem}>
                <img src={imageUrl} alt={item.productId.name} style={styles.image} />
                <div style={styles.details}>
                  <h3 style={styles.productName}>{item.productId.name}</h3>
                  <p style={styles.price}>Price: ${item.productId.price}</p>
                  <div style={styles.quantityControls}>
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, -1)}
                      style={styles.quantityButton}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, 1)}
                      style={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div style={styles.total}>
            <strong>Total:</strong> ${totalPrice}
          </div>
        </div>
      ) : (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      )}
      <button onClick={handleCheckout} style={styles.checkoutButton}>
        Proceed to Checkout
      </button>
    </div>
  );
};

const styles = {
  // (Keep the styles from your current implementation)
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#444',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  details: {
    marginLeft: '20px',
    flex: '1',
  },
  productName: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
  },
  price: {
    margin: '5px 0',
    fontSize: '18px',
    color: '#777',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  quantityButton: {
    padding: '8px 15px',
    fontSize: '16px',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px',
  },
  quantity: {
    margin: '0 10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  removeButton: {
    padding: '10px 15px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '25px',
    color: '#333',
  },
  checkoutButton: {
    display: 'block',
    margin: '30px auto 0',
    padding: '12px 25px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '18px',
  },
};

export default ViewCartTourist;
