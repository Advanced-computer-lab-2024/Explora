import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCardTourist from './ProductCardTourist';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState('');
    const [wishlist, setWishlist] = useState([]); // Wishlist state

    const navigate = useNavigate();

    const handleWishlistClick = () => {
        navigate('/wishlist', { state: { wishlist } }); // Pass wishlist state to the new page
    };

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Products/unarchivedProducts');
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

    return (
        <div className="product-list">
          <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          padding: '5px 10px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

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
  <div className="icon-container">
    {/* Cart Icon */}
    <div className="cart-icon" onClick={() => navigate('/view-cart')}>
  <FontAwesomeIcon icon={faCartShopping} />
</div>


    {/* Heart Icon */}
    <button className="wishlist-btn" onClick={handleWishlistClick}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  </div>
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
                        <ProductCardTourist
                            key={product._id}
                            product={product}
                            products={products}
                            setProducts={setProducts}
                            setWishlist={setWishlist}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
