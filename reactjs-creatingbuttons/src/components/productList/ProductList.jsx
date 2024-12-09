import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../../assets/cropped_image.png';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};



const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState("");
    const [archivedProducts, setArchivedProducts] = useState([]); // Archived products
    const [filterStatus, setFilterStatus] = useState('all'); // Track selected filter status
    const [message, setMessage] = useState('');
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [badgeLevel, setBadgeLevel] = useState('');
    const [guideRatings, setGuideRatings] = useState({});
    const [guideComments, setGuideComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
    const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products');
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

        
      <div style={{ marginTop: '80px' }}></div>
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

            <div className="add-product-btn" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
  {/* Add Product Button */}
  <button onClick={handleAddProductClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '24px', color: '#008080' }} />
  </button>

  {/* Archived Products Link */}
  <Link
    to={{
      pathname: "/archived-products",
      state: { archivedProducts }, // Passing archived products to ArchivedProducts
    }}
    className="archive-link"
    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#008080' }}
  >
    <FontAwesomeIcon icon={faBoxArchive} style={{ fontSize: '24px' }} />
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
        </div>
        
    );
};

export default ProductList;
