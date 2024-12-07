import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ProductModal from './ProductModal'; // New Product Modal



const ProductCardTourist = ({ product, products, setProducts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [message, setMessage] = useState('');
    const [userRating, setUserRating] = useState(0); // State for user's selected rating
    const [userReview, setUserReview] = useState(''); // State for review text
    const [cartQuantity, setCartQuantity] = useState(0); // Quantity in the cart
    const [showProductModal, setShowProductModal] = useState(false); // Product modal visibility



    // Handle adding to cart
    const handleAddToCart = () => {
        setCartQuantity(1);
        setMessage('Product added to cart successfully!');
    };

    // Increment cart quantity
    const incrementQuantity = () => {
        setCartQuantity(cartQuantity + 1);
    };

    // Decrement cart quantity
    const decrementQuantity = () => {
        if (cartQuantity > 1) {
            setCartQuantity(cartQuantity - 1);
        } else if (cartQuantity === 1) {
            setCartQuantity(0); // Remove from cart if quantity reaches 0
        }
    };

    const [isInWishlist, setIsInWishlist] = useState(false); // Wishlist state
    const [showModal, setShowModal] = useState(false); // State for modal visibility



    // Handle wishlist toggle
    const handleWishlistToggle = () => {
        setIsInWishlist(!isInWishlist);
        setShowModal(true); // Show the modal when the heart is clicked

    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };



    // Handle the edit button click
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(product.name);
        setEditedPrice(product.price);
        setEditedDescription(product.description);
    };

    // Function to update the product
    const updateProduct = async () => {
        try {
            const inputData = {
                name: editedName,
                price: editedPrice,
                description: editedDescription,
            };

            const response = await axios.put(`http://localhost:4000/Products/updateProduct/${product._id}`, inputData);
            console.log('Response from update:', response.data);

            setProducts(prevProducts =>
                prevProducts.map(prod =>
                    prod._id === product._id ? { ...prod, ...inputData } : prod
                )
            );

            setIsEditing(false);
            setMessage('Product successfully updated!');
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product: ' + error.message);
        }
    };

    // Separate function to submit a rating
    const handleRatingSubmit = async () => {
        if (userRating === 0) {
            setMessage('Please provide a rating.');
            return;
        }

        try {
            const ratingData = {
                rating: userRating,
                comment: 'No comment provided' // Include a default comment
            };

            const response = await axios.post(`http://localhost:4000/Products/addRating/${product._id}`, ratingData);
            console.log('Rating response:', response.data);

            setProducts(prevProducts =>
                prevProducts.map(prod =>
                    prod._id === product._id ? response.data.product : prod
                )
            );

            setUserRating(0);
            setMessage('Thank you for your rating!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            setMessage('Error submitting rating: ' + error.message);
        }
    };

    // Separate function to submit a review
    const handleReviewSubmit = async () => {
        if (userReview.trim() === '') {
            setMessage('Please provide a review.');
            return;
        }

        try {
            const reviewData = {
                user: '672404b5711f4330c4103753', // Replace with logged-in user's info if available
                comment: userReview,
            };

            const response = await axios.post(`http://localhost:4000/Products/addReview/${product._id}`, reviewData);
            console.log('Review response:', response.data);

            setProducts(prevProducts =>
                prevProducts.map(prod =>
                    prod._id === product._id ? response.data.product : prod
                )
            );

            setUserReview('');
            setMessage('Thank you for your review!');
        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage('Error submitting review: ' + error.message);
        }
    };

    // Render stars based on average rating
    const renderStars = (averageRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i key={i} className={i <= averageRating ? "fa-solid fa-star" : "fa-regular fa-star"} />
            );
        }
        return stars;
    };

    // Handle rating selection
    const handleRatingClick = (rating) => {
        setUserRating(rating);
    };

    // Render interactive star rating for user
    const renderUserRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={i <= userRating ? "fa-solid fa-star selected" : "fa-regular fa-star"}
                    onClick={() => handleRatingClick(i)}
                />
            );
        }
        return stars;
    };

    const handleViewDetails = () => {
        setShowProductModal(true); // Open the product modal
    };

    const closeProductModal = () => {
        setShowProductModal(false); // Close the product modal
    };

    return (
        <div className="product-card">
            <div 
        className="wishlist-icon" 
        onClick={handleWishlistToggle} 
        style={{ position: 'absolute', left: '75%' }} // Adjust left to move the heart
    >
        <i className={isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
    </div>
    <img src={product.image} alt={product.name} className="product-image" />

    {isEditing ? (
        <>
            <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="edit-input"
                placeholder="Edit name"
            />
            <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="edit-input"
                placeholder="Edit description"
            />
            <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(Number(e.target.value))}
                className="edit-input"
                placeholder="Edit price"
            />
            <button onClick={updateProduct}>Save</button>
        </>
    ) : (
        <>
            <h2 className="product-title">{editedName}</h2>
            <p className="product-description">{editedDescription}</p>
            <p className="product-price">${editedPrice.toFixed(2)}</p>
            <p className="product-ratings">
                Average Rating: {renderStars(product.averageRating)}
            </p>
        </>
    )}

    <p className="product-seller">Seller: {product.seller}</p>
    <p className="product-seller">Number of Reviews: {product.reviews.length}</p>


    {/* Add to Cart Button */}
    {cartQuantity === 0 ? (
                <button
                    onClick={handleAddToCart}
                    style={{
                        width: '80%',
                        padding: '10px',
                        background: '#008080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    Add to Cart
                </button>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <button
                            onClick={decrementQuantity}
                            style={{
                                width: '30px',
                                height: '30px',
                                background: '#ff4c4c',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cartQuantity}</span>
                        <button
                            onClick={incrementQuantity}
                            style={{
                                width: '30px',
                                height: '30px',
                                background: '#4caf50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </button>
                    </div>
                )}

                {/* View Details Button */}
                <button
            onClick={handleViewDetails}
            style={{
                width: '80%',
                padding: '10px',
                marginTop: '10px',
                background: '#008080',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
            }}
        >
            View Details
        </button>

        {/* Product Modal */}
        {showProductModal && (
            <ProductModal product={product} onClose={closeProductModal} />
        )}

    {/* Wishlist Icon */}
    

    {showModal && (
        <Modal onClose={closeModal}>
            <h2>Added to Wishlist</h2>
            <img src={product.image} alt={product.name} className="modal-product-image" />
            <p className="modal-product-title">{product.name}</p>
            <p className="modal-product-price">${product.price.toFixed(2)}</p>
            <button className="modal-close-button" onClick={closeModal}>
                Close
            </button>
        </Modal>
    )}

    {message && <p className="message">{message}</p>}
    
</div>

    );
};

export default ProductCardTourist;


