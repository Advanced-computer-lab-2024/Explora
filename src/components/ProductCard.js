import React from 'react';

function ProductCard({ products }) {
    if (products.length === 0) {
        return <p>No products available. Add one!</p>;
    }

    return (
        <ul>
            {products.map((product, index) => (
                <li key={index}>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} width="100" />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Seller: {product.seller}</p>
                    <p>Rating: {product.rating} / 5</p>
                </li>
            ))}
        </ul>
    );
}

export default ProductCard;
