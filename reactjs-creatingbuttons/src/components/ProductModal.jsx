import './Modal.css'; // Include the provided styles
import React, { useState } from 'react'; // Import useState



const ProductModal = ({ product, onClose }) => {
    const [cartQuantity, setCartQuantity] = useState(0); // Quantity in the cart

    // Handle adding to cart
    const handleAddToCart = () => {
        setCartQuantity(1);
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

                {/* Add to Cart Section */}
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
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
