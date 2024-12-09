import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './productCard/ProductCard'; // Ensure correct path to ProductCard
import { useNavigate } from 'react-router-dom';

const ArchivedProducts = () => {
    const [archivedProducts, setArchivedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // Fetch archived products when the component mounts
    useEffect(() => {
        const fetchArchivedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products/archiveProducts');
                setArchivedProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching archived products:', err);
                setError('Failed to fetch archived products');
                setLoading(false);
            }
        };

        fetchArchivedProducts();
    }, []);

    // Inline CSS styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        heading: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '20px',
        },
        productList: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: '20px',
        },
        productCard: {
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
            textAlign: 'center',
            transition: 'transform 0.3s ease-in-out',
        },
        productCardHover: {
            transform: 'translateY(-10px)',
        },
        productImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '5px',
        },
        productTitle: {
            fontSize: '1.2rem',
            color: '#333',
            marginTop: '10px',
        },
        productDescription: {
            fontSize: '1rem',
            color: '#666',
            marginTop: '5px',
        },
        productPrice: {
            fontSize: '1.1rem',
            color: '#00b300',
            marginTop: '10px',
        },
        loading: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#555',
            marginTop: '20px',
        },
        error: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#e53935',
            marginTop: '20px',
        },
    };

    if (loading) {
        return <p style={styles.loading}>Loading archived products...</p>;
    }

    if (error) {
        return <p style={styles.error}>{error}</p>;
    }

    return (
        <div>
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        backgroundColor: '#008080',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        fontSize: '14px',
        cursor: 'pointer',
        zIndex: 1100,
      }}
    >
      Back
    </button>
        <div style={styles.container}>
            <h1 style={styles.heading}>Archived Products</h1>
            {archivedProducts.length > 0 ? (
                <div style={styles.productList}>
                    {archivedProducts.map((product) => (
                        <div
                            key={product._id}
                            style={styles.productCard}
                            className="product-card"
                        >
                            <ProductCard
                                product={product}
                                products={archivedProducts}
                                setProducts={setArchivedProducts}
                                onArchive={() => {}}
                                isArchived={true} // Pass isArchived prop as true
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No archived products found.</p>
            )}
        </div>
        </div>
    );
};

export default ArchivedProducts;
