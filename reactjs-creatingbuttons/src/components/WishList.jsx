import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishList = () => {

    const [wishlist, setWishlist] = useState([]);
    // State to track wishlist items with isInWishlist
    const [wishlistState, setWishlistState] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isInWishlist, setIsInWishlist] = useState(false);
    
    const touristId = "67322cdfa472e2e7d22de84a";  // Example tourist ID
    
    // Fetch wishlist on component mount
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!touristId) {
                setMessage('User not logged in. Please log in first.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:4000/wishlist/${touristId}`);
                console.log('Fetched wishlist:', response.data);  // Log the data
                if (response.data && response.data.items) {
                    setWishlist(response.data.items);
                    setWishlistState(response.data.items.map((product) => ({
                        ...product,
                        isInWishlist: true,
                    })));
                } else {
                    setMessage('Wishlist is empty or not found.');
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setMessage('Error fetching wishlist: ' + error.message);
            }
        };
    
        fetchWishlist();
    }, []);
    
    // Handle wishlist toggle
    const handleWishlistToggle = async (productId) => {
        if (!touristId) {
            setMessage('User not logged in. Please log in first.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/wishlist/toggle', { productId, touristId });
            console.log(response.data.message);
            setWishlistState(response.data.wishlist.items);
            
            const isProductInWishlist = response.data.wishlist.items.some(item => item.productId && item.productId.toString() === productId);
            setIsInWishlist(isProductInWishlist); // Update the heart color

            setModalTitle(isProductInWishlist ? 'Added to Wishlist' : 'Removed from Wishlist');
            setShowModal(true);
        } catch (error) {
            console.error("Error toggling wishlist item:", error.response?.data || error.message);
        }
    };

    // Handle Add to Cart functionality
    const handleAddToCart = async (productId) => {
        if (!touristId) {
            setMessage('User not logged in. Please log in first.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:4000/cart/add/${touristId}`, { productId });
            console.log('Add to cart response:', response.data);
            setMessage('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setMessage('Error adding product to cart: ' + error.message);
        }
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Render stars for average rating
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
        <div className="product-list">
            <h1>My Wishlist</h1>
            <div className="product-cards-container">
                {wishlistState.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h2 className="product-title">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-seller">Seller: {product.seller}</p>
                        <p className="product-ratings">Average Rating: {renderStars(product.averageRating)}</p>
                        <p className="product-reviews">{product.reviews.length} reviews</p>
                        
                        <div className="wishlist-icon" onClick={() => handleWishlistToggle(product._id)}>
                            <i
                                className={product.isInWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                                style={{ color: product.isInWishlist ? 'red' : 'gray', cursor: 'pointer' }}
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: '#000',   // Black background
                                color: '#fff',             // White text
                                border: 'none',            // Remove default border
                                borderRadius: '5px',       // Rounded corners
                                padding: '10px 15px',      // Padding inside the button
                                fontSize: '14px',          // Font size
                                cursor: 'pointer',        // Pointer cursor on hover
                                marginTop: '10px',         // Space above the button
                                transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition
                            }}
                            onClick={() => handleAddToCart(product._id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
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
