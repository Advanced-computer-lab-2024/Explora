import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState([]);
    const [archivedProducts, setArchivedProducts] = useState([]); // Archived products

    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsByName = async (name) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/productByName/${name}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by name:', error);
        }
    };

    const fetchFilteredProducts = async (min, max) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/filterByPrice?min=${min}&max=${max}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    const fetchSortedProducts = async (order) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/sortByRating?order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching sorted products:', error);
        }
    };

    const archiveProduct = (productId) => {
        setProducts((prevProducts) => {
            const productToArchive = prevProducts.find((product) => product._id === productId);
            setArchivedProducts((prevArchived) => [...prevArchived, productToArchive]); // Add to archived
            return prevProducts.filter((product) => product._id !== productId); // Remove from active
        });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            fetchProductsByName(value); 
        } else {
            fetchAllProducts(); 
        }
    };

    const handlePriceChange = () => {
        fetchFilteredProducts(minPrice, maxPrice);
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        if (order) {
            fetchSortedProducts(order); 
        } else {
            fetchAllProducts(); 
        }
    };

    useEffect(() => {
        fetchAllProducts(); 
    }, []);

    const handleAddProductClick = () => {
        navigate('/add-product');
    };

    return (
        <div className="product-list">
            <h1>Available Products</h1>

            <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={handleSearchChange} 
                className="search-input"
            />

            <div className="price-filter">
                <label>
                    Min Price: $
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))} 
                        onBlur={handlePriceChange} 
                        className="price-input"
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))} 
                        onBlur={handlePriceChange} 
                        className="price-input"
                    />
                </label>
            </div>

            <div className="add-product-btn">
                <button onClick={handleAddProductClick}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                <Link
                to={{
                    pathname: "/archived-products",
                    state: { archivedProducts } // Passing archived products to ArchivedProducts
                }}
                className="archive-link"
            >
                View Archived Products
            </Link>
            </div>

            <div className="sort-filter">
                <label>
                    Sort by Ratings:
                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="sort-input"
                    >
                        <option value="">Select</option>
                        <option value="high-to-low">High to Low</option>
                        <option value="low-to-high">Low to High</option>
                    </select>
                </label>
            </div>

            <div className="product-cards-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} onArchive={archiveProduct} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
