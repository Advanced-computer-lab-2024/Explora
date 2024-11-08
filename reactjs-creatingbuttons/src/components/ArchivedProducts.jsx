import React from 'react';
import { useLocation } from 'react-router-dom';

const ArchivedProducts = () => {
    const location = useLocation();
    const { archivedProducts = [] } = location.state || {}; // Retrieve archived products passed from ProductList

    return (
        <div>
            <h1>Archived Products</h1>
            {archivedProducts.length > 0 ? (
                <ul>
                    {archivedProducts.map((product) => (
                        <li key={product._id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Seller: {product.seller}</p>
                            <p>Average Rating: {product.averageRating}</p>
                            <p>{product.reviews?.length || 0} reviews</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No archived products found.</p>
            )}
        </div>
    );
};

export default ArchivedProducts;
