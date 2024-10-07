import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState('');

    const navigate = useNavigate();

    // Function to fetch all products
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products');
            setProducts(response.data); // Update state with fetched products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Function to fetch products based on search term
    const fetchProductsByName = async (name) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/productByName/${name}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by name:', error);
        }
    };

    // Function to fetch filtered products by price range
    const fetchFilteredProducts = async (min, max) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/filterByPrice?min=${min}&max=${max}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    // Function to fetch sorted products by ratings
    const fetchSortedProducts = async (order) => {
        try {
            const response = await axios.get(`http://localhost:4000/Products/sortByRating?order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching sorted products:', error);
        }
    };

    // Function to handle changes in the search bar
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            fetchProductsByName(value); // Fetch products by name when there's input
        } else {
            fetchAllProducts(); // Fetch all products if search bar is empty
        }
    };

    // Function to handle price filtering
    const handlePriceChange = () => {
        fetchFilteredProducts(minPrice, maxPrice);
    };

    // Function to handle sorting change
    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        if (order) {
            fetchSortedProducts(order);
        } else {
            fetchAllProducts(); // Fetch all products if sorting is cleared
        }
    };

    useEffect(() => {
        fetchAllProducts(); // Initial fetch of all products on component mount
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
                onChange={handleSearchChange} // Use the handleSearchChange
                className="search-input"
            />

            <div className="price-filter">
                <label>
                    Min Price: $
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))} // Update min price
                        onBlur={handlePriceChange} // Trigger fetch on input blur
                        className="price-input"
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))} // Update max price
                        onBlur={handlePriceChange} // Trigger fetch on input blur
                        className="price-input"
                    />
                </label>
            </div>

            <div className="add-product-btn">
                <button onClick={handleAddProductClick}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            <div className="sort-filter">
                <label>
                    Sort by Ratings:
                    <select
                        value={sortOrder}
                        onChange={handleSortChange} // Use the handleSortChange
                        className="sort-input"
                    >
                        <option value="">Select</option>
                        <option value="high-to-low">High to Low</option>
                        <option value="low-to-high">Low to High</option>
                    </select>
                </label>
            </div>

            <div className="product-cards-container">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
