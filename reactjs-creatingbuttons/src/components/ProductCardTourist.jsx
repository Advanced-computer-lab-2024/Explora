import React, { useState } from 'react';
import axios from 'axios';

const ProductCard = ({ product, products, setProducts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [message, setMessage] = useState('');
    const [userRating, setUserRating] = useState(0); // State to store user's selected rating
    const [userReview, setUserReview] = useState(''); // State for review text

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
                reviews: product.reviews
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

    // Function to render stars based on averageRating
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

    // Handle review submission
    const handleReviewSubmit = () => {
        setMessage(`Thank you for your review!`);
        setUserRating(0); // Reset rating
        setUserReview(''); // Reset review input
    };

    // Function to render interactive star rating for user
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
                {renderUserRating()} {/* Display interactive rating stars */}
            </div>

            <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Write your review here..."
                rows="3"
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProductCard;
