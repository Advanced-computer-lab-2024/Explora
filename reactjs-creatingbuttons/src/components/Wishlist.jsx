import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const touristId = localStorage.getItem('userId') || '';
//   const touristId = '67322cdfa472e2e7d22de84a'; // Replace with actual touristId


  useEffect(() => {
    const fetchWishlist = async () => {      
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage

      if (!touristId) {
        setMessage('User not logged in. Please log in first.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/wishlist/${touristId}`);
    if (response.data && Array.isArray(response.data.items)) {
        setWishlist(response.data.items);
    } else {
        setMessage('Your wishlist is empty.');
    }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setMessage('Could not load wishlist. Please try again later.');
      }
    };

    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (productId) => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage

    if (!touristId) {
      setMessage('User not logged in. Please log in first.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/wishlist/toggle', {
        productId,
        touristId,
      });
  
      const updatedWishlist = response.data.wishlist?.items || [];
      setWishlist(updatedWishlist); // Update the state
      const isInWishlist = updatedWishlist.some(
        (item) => item.productId?._id === productId
      );
  
      setModalTitle(isInWishlist ? 'Added to Wishlist' : 'Removed from Wishlist');
      setShowModal(true);
    } catch (error) {
      console.error('Error toggling wishlist item:', error);
      setMessage('Could not update wishlist. Please try again later.');
    }
  };
  

  const handleAddToCart = async (productId) => {
    const touristId = localStorage.getItem('userId');  // Dynamically get userId from localStorage

    if (!touristId) {
      setMessage('User not logged in. Please log in first.');
      return;
    }

    try {
      await axios.post(`http://localhost:4000/cart/add/${touristId}`, { productId });
      setMessage('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setMessage('Error adding product to cart. Please try again.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= averageRating ? 'fa-solid fa-star' : 'fa-regular fa-star'}
          style={{ color: 'gold', marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {message && <p className="info-message">{message}</p>}
      <div className="product-cards-container">
      {wishlist.length > 0 ? (
  wishlist.map((item) => {
    const product = item.productId; // Extract productId directly from item
    if (!product) {
      return null; // Skip rendering this item if product is null
    }
    const imageUrl = "http://localhost:4000/" + item.productId.image;

    return (
      <div key={product.id} className="product-card">
        <img
          src={imageUrl}
          alt={product.name || 'No Image'}
          className="product-image"
        />
        <h2 className="product-title">{product.name || 'Unnamed Product'}</h2>
        <p className="product-description">{product.description || 'No description available.'}</p>
        <p className="product-seller">Seller: {product.seller || 'Unknown'}</p>
        <p className="product-ratings">
          Average Rating: {renderStars(product.averageRating || 0)}
        </p>
        <p className="product-reviews">{product.reviews?.length || 0} reviews</p>
        <div
          className="wishlist-icon"
          onClick={() => handleWishlistToggle(product._id)}
        >
          <i
            className={
              wishlist.some((item) => item.productId?._id === product._id)
                ? 'fa-solid fa-heart'
                : 'fa-regular fa-heart'
            }
            style={{
              color: wishlist.some((item) => item.productId?._id === product._id)
                ? 'red'
                : 'gray',
              cursor: 'pointer',
            }}
          />
        </div>
        <button
          style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            fontSize: '14px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    );
  })
) : (
  <p>Your wishlist is empty.</p>
)}

      </div>
      {showModal && (
        <div className="modal">
          <h2>{modalTitle}</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default WishList;