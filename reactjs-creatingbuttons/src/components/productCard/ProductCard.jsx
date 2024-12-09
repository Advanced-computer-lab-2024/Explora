import React, { useState } from 'react';
import axios from 'axios';
import { FaBoxArchive } from "react-icons/fa6";


const ProductCard = ({ product, onArchive }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [message, setMessage] = useState('');
    const [products, setProducts] = useState([]);
    const imageUrl = product.image.startsWith('http') ? product.image : `http://localhost:4000/${product.image}`;
    // Handle the edit button click
    const handleEditClick = () => {
        setIsEditing(true);
        // Set edited values to current product details
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
                // Optionally include reviews if needed
            };
    
            const response = await axios.put(`http://localhost:4000/Products/updateProduct/${product._id}`, inputData);
            
            // Log response to ensure you get updated product data
            console.log('Response from update:', response.data);
    
            if (response.status === 200) {
                setProducts(prevProducts =>
                    prevProducts.map(prod =>
                        prod._id === product._id ? { ...prod, ...response.data } : prod
                    )
                );
                setIsEditing(false);
                setMessage('Product successfully updated!');
            } else {
                setMessage('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product: ' + error.message);
        }
    };
    // Function to archive the product
    const archiveProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/Products/archiveProduct/${product._id}`);
            
            // Call the passed-in archive function to update the UI
            onArchive(product._id); 

            setMessage('Product archived successfully!');
        } catch (error) {
            console.error('Error archiving product:', error);
            setMessage('Error archiving product: ' + error.message);
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

    return (
        <div className="product-card">
            <img src={imageUrl} alt={product.name} className="product-image" />

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
                        Average Rating: {renderStars(product.averageRating)} {/* Render stars based on average rating */}
                    </p>
                    <p className="product-quantity">Available Quantity: {product.quantity}</p>
                    <p className="product-sales">Total Sales: {product.sales}</p>
                    <p className="product-sales">    State: {product.archived ? 'Archived' : 'Active'}
                    </p>
                </>
            )}

            <p className="product-seller">Seller: {product.seller}</p>
            <p className="product-reviews">{product.reviews.length} reviews</p>

            <button className="edit-button" onClick={handleEditClick}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                onClick={archiveProduct}
                style={{
                    marginTop: '10px',
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%', // To make it span the width of the card
                }}
            >
                
                <FaBoxArchive style={{ color: 'white', backgroundColor: 'white', fontSize: '18px' }} /> 


            </button>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProductCard;
