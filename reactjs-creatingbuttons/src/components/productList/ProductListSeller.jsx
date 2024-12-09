import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState('');
    const [archivedProducts, setArchivedProducts] = useState([]); // Archived products
    const [filterStatus, setFilterStatus] = useState('all'); // Track selected filter status

    const navigate = useNavigate();

    // Fetch products based on sellerId from localStorage
    const fetchAllProducts = async () => {
        const sellerId = localStorage.getItem('userId'); // Get seller ID from localStorage
        if (!sellerId) {
            console.error('Seller ID not found in localStorage');
            return;
        }

        try {
            console.log('Seller ID:', sellerId);
            const response = await axios.get(`http://localhost:4000/Products/seller/${sellerId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchArchivedProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products/archiveProducts');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching archived products:', error);
        }
    };

    const fetchUnarchivedProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products/unarchivedProducts');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching unarchived products:', error);
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
        if (min && max && min < max) { // Ensure min is less than max
            try {
                const response = await axios.get(
                    `http://localhost:4000/Products/filterByPrice?min=${min}&max=${max}`
                );
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching filtered products:', error);
            }
        } else {
            setProducts([]); // Optionally clear products if filter is invalid
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

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterStatus(value);

        if (value === 'archived') {
            fetchArchivedProducts();
        } else if (value === 'unarchived') {
            fetchUnarchivedProducts();
        } else {
            fetchAllProducts();
        }
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

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const numericValue = Number(value);
        
        if (name === 'minPrice') {
            setMinPrice(numericValue);
        } else if (name === 'maxPrice') {
            setMaxPrice(numericValue);
        }
    };

    useEffect(() => {
        if (minPrice && maxPrice && minPrice < maxPrice) {
            const timeoutId = setTimeout(() => {
                fetchFilteredProducts(minPrice, maxPrice);
            }, 500); // Delay by 500ms

            return () => clearTimeout(timeoutId); // Cleanup timeout if the component re-renders
        }
    }, [minPrice, maxPrice]); // Trigger effect when minPrice or maxPrice changes

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
                        name="minPrice"
                        value={minPrice}
                        onChange={(e) => handlePriceChange(e)}
                        className="price-input"
                    />
                </label>
                <label>
                    Max Price: $
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(e)}
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

            <div className="sort-filter">
                <label>
                    Filter by status:
                    <select
                        value={filterStatus}
                        onChange={handleFilterChange} 
                        className="sort-input"
                    >
                        <option value="all">All</option>
                        <option value="archived">Archived</option>
                        <option value="unarchived">Active</option>
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
