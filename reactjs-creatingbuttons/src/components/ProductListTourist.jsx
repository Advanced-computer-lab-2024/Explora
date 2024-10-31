import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ProductCard from './productCard/ProductCard';

const ProductListTourist = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState(''); // New state for sorting

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Mock fetch or API call to get products
    const fetchProducts = async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description for product 1',
          price: 29.99,
          seller: 'Seller 1',
          ratings: 4.5,
          reviews: 10,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description for product 2',
          price: 19.99,
          seller: 'Seller 2',
          ratings: 4.0,
          reviews: 5,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          name: 'Amazing Product',
          description: 'Amazing product description',
          price: 49.99,
          seller: 'Seller 3',
          ratings: 5.0,
          reviews: 20,
          image: 'https://via.placeholder.com/150',
        },
        // Add more products as needed
      ];
      setProducts(mockProducts);
    };

    fetchProducts();
  }, []);

  // Function to sort products by ratings
  const sortProductsByRatings = (products, order) => {
    return [...products].sort((a, b) => {
      if (order === 'high-to-low') {
        return b.ratings - a.ratings; // Sort by high to low
      } else if (order === 'low-to-high') {
        return a.ratings - b.ratings; // Sort by low to high
      }
      return products;
    });
  };

  // Filter and sort products based on search, price, and sort order
  const filteredAndSortedProducts = sortProductsByRatings(
    products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    ),
    sortOrder
  );

  return (
    <div className="product-list">
      <h1>Available Products</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Price Range Filter */}
      <div className="price-filter">
        <label>
          Min Price: $
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="price-input"
          />
        </label>
        <label>
          Max Price: $
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-input"
          />
        </label>
      </div>

      {/* Sorting by Ratings */}
      <div className="sort-filter">
        <label>
          Sort by Ratings:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-input"
          >
            <option value="">Select</option>
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
          </select>
        </label>
      </div>

      {/* Product Cards */}
      <div className="product-cards-container">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListTourist;
