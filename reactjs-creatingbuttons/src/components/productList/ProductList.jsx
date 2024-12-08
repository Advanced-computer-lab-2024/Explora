import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
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
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/acc-settings" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/flagged-events" style={{ color: 'white', textDecoration: 'none' }}>Flag Event</a>
          

          <a href="/product-list" style={{ color: 'white', textDecoration: 'none' }}>Products</a>


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/category-manager')}
                style={buttonStyle}
              >
                Manage Activities
              </button>
              <button
                onClick={() => navigate('/tag-manager')}
                style={buttonStyle}
              >
                Manage Prefrences
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                Manage Accounts
              </a>

              <button
                onClick={() => navigate('/admin-documents')}
                style={buttonStyle}
              >
                View Uploaded Documents
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/admin-complaints')}
                style={buttonStyle}
              >
                View Complaints
              </button>
              <button
                onClick={() => navigate('/viewDeleteRequests')}
                style={buttonStyle}
              >
                View Delete Requests
              </button>
              <button
                onClick={() => navigate('/promo-code')}
                style={buttonStyle}
              >
                Create Promo Code
              </button>
            

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/admin-view-users')}
                    style={buttonStyle}
                  >
Delete Accounts                  </button>
                  <button
                    onClick={() => navigate('/login-tourism')}
                    style={buttonStyle}
                  >
Add Tourism Governor                  </button>
                  <button
                    onClick={() => navigate('/login-admin')}
                    style={buttonStyle}
                  >
Add Admin                  </button>
                  

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
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
        </div>
        
    );
};

export default ProductList;
