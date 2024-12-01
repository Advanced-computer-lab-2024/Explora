import React, { useState } from 'react';
const handleAddToCart = (productId) => {
    // Logic to handle adding the product to the cart
    console.log(`Product ${productId} added to the cart`);
    setMessage('Item added to cart successfully!');
};


const Wishlist = () => {
    // Hardcoded products for wishlist
    const wishlist = [
        {
            _id: '1',
            name: 'Handcrafted Wooden Chair',
            price: 99.99,
            image: 'https://via.placeholder.com/150',
            description: 'A beautiful handcrafted wooden chair.',
            seller: 'Crafty Creations',
            averageRating: 4.5,
            reviews: [
                { _id: 'r1', user: 'John Doe', comment: 'Very sturdy and comfortable!', rating: 5 },
                { _id: 'r2', user: 'Jane Smith', comment: 'Looks great in my living room.', rating: 4 },
            ],
        },
        {
            _id: '2',
            name: 'Luxury Leather Wallet',
            price: 59.99,
            image: 'https://via.placeholder.com/150',
            description: 'A premium leather wallet with multiple compartments.',
            seller: 'Elite Accessories',
            averageRating: 4.8,
            reviews: [
                { _id: 'r3', user: 'Alice', comment: 'Great quality and design.', rating: 5 },
                { _id: 'r4', user: 'Bob', comment: 'Perfect gift for my dad!', rating: 4 },
            ],
        },
        {
            _id: '3',
            name: 'Wireless Bluetooth Headphones',
            price: 129.99,
            image: 'https://via.placeholder.com/150',
            description: 'High-quality noise-cancelling headphones.',
            seller: 'TechWorld',
            averageRating: 4.7,
            reviews: [
                { _id: 'r5', user: 'Sam', comment: 'Amazing sound quality!', rating: 5 },
                { _id: 'r6', user: 'Emma', comment: 'Battery life is impressive.', rating: 4 },
            ],
        },
    ];

    // State to track wishlist items
    const [wishlistState, setWishlistState] = useState(
        wishlist.map((product) => ({ ...product, isInWishlist: true }))
    );

    // Handle wishlist toggle
    const handleWishlistToggle = (productId) => {
        setWishlistState((prevState) =>
            prevState.map((product) =>
                product._id === productId
                    ? { ...product, isInWishlist: !product.isInWishlist }
                    : product
            )
        );
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
                        <p className="product-price">${product.price.toFixed(2)}</p>
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
    onClick={() => console.log('Add to Cart clicked!')}
>
    Add to Cart
</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
