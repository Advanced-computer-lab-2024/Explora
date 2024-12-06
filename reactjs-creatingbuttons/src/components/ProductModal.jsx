import React from 'react';
import './Modal.css'; // Include the provided styles

const ProductModal = ({ product, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={product.image}
                    alt={product.name}
                    className="modal-product-image"
                />
                <div className="modal-content">
                    <h2 className="modal-product-title">{product.name}</h2>
                    <p className="modal-product-price">${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <p><strong>Seller:</strong> {product.seller}</p>
                    <p><strong>Number of Reviews:</strong> {product.reviews.length}</p>
                    <div>
                        <h3>Ratings:</h3>
                        <p>Average Rating: {product.averageRating} / 5</p>
                    </div>
                </div>
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
