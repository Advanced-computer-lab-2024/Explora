// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return <p>No products available</p>;
    }

    return (
        <ul>
            {products.map((product, index) => (
                <li key={index}>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Seller: {product.seller}</p>
                    <p>Ratings: {product.ratings}</p>
                    <p>Reviews: {product.reviews}</p>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
