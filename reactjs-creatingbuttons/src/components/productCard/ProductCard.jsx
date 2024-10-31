// ProductCard.js
import React, { useState } from 'react';
import axios from 'axios';
import './productsCard.css';


const ProductCard = ({ product, products, setProducts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [message, setMessage] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(product.name);
        setEditedPrice(product.price);
        setEditedDescription(product.description);
    };

    const updateProduct = async () => {
        try {
            const inputData = {
                name: editedName,
                price: editedPrice,
                description: editedDescription,
                reviews: product.reviews 
            };

            const response = await axios.put(`http://localhost:4000/Products/updateProduct/${product._id}`, inputData);

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

    const renderStars = (averageRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i key={i} className={i <= averageRating ? "fa-solid fa-star" : "fa-regular fa-star"} />
            );
        }
        return stars;
    };

    return (
        <div className="product-card">
            {/* Display product image */}
            {product.image ? (
                <img src={product.image} alt={product.name} className="product-image" />
            ) : (
                <p>No Image Available</p>
            )}
    
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
    
            <button className="edit-button" onClick={handleEditClick}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
    
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProductCard;
