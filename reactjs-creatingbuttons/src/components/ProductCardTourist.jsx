import React, { useState } from 'react';
import axios from 'axios';

const ProductCardTourist = ({ product, products, setProducts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [message, setMessage] = useState('');
    const [userRating, setUserRating] = useState(0); // State for user's selected rating
    const [userReview, setUserReview] = useState(''); // State for review text
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  

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

    // Function to handle the buy product action
    const handleBuyProduct = () => {
        const quantity = 1; // Default quantity set to 1
        
        fetch('http://localhost:4000/buy/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'), // Retrieve userId from localStorage
                productId: product._id, // Use product._id directly
                quantity, // Quantity of the product
            }),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || 'Failed to purchase product');
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log('Purchase successful:', data);
            alert(`Product "${product.name}" has been successfully purchased!`);
            
            // Optionally update the product quantity locally
           
        })
        .catch((error) => {
            console.error('Error buying product:', error);
            alert('Error buying product: ' + error.message);
        });
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

    return (
        <div className="product-card">
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
            <p className="product-reviews">{product.reviews.length} reviews</p>

            {/* Rating input for the user */}
            <div className="user-rating">
                <p>Rate this product:</p>
                {renderUserRating()}
                <button onClick={handleRatingSubmit}>Submit Rating</button>
            </div>

            {/* Review input for the user */}
            <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Write your review here..."
                rows="3"
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>

            {message && <p className="message">{message}</p>}

            {/* Display all reviews */}
            <div className="product-reviews">
                <h3>Reviews:</h3>
                {product.reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    product.reviews.map(review => (
                        <div key={review._id} className="review">
                            <p><strong>{review.user ? review.user : 'Anonymous'}</strong></p>
                            <p>{review.comment}</p>
                            <p>Rating: {renderStars(review.rating)}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Add Buy Button */}
            <button onClick={handleBuyProduct} className="buy-button">
                Buy Product
            </button>
        </div>
    );
};

export default ProductCardTourist;
