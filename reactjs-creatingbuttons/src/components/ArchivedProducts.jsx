import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ArchivedProducts = () => {
    const [archivedProducts, setArchivedProducts] = useState([]);

    useEffect(() => {
        // Get archived products from local storage
        const archived = JSON.parse(localStorage.getItem('archivedProducts')) || [];
        setArchivedProducts(archived);
    }, []);

    return (
        <div className="archived-products">
            <h1>Archived Products</h1>
            <div className="product-cards-container">
                {archivedProducts.length > 0 ? (
                    archivedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No archived products found.</p>
                )}
            </div>
        </div>
    );
};

export default ArchivedProducts;
