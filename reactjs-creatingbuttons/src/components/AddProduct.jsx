import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellerUsername, setSellerUsername] = useState(''); // Changed to username
  const [sellerId, setSellerId] = useState(''); // State for seller's ObjectId
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleProductNameChange = (event) => setProductName(event.target.value);
  const handleProductDetailsChange = (event) => setProductDetails(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleQuantityChange = (event) => setQuantity(event.target.value);
  const handleSellerUsernameChange = (event) => setSellerUsername(event.target.value);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Function to fetch seller ID based on username
  const fetchSellerId = async (username) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${username}`); // Adjust endpoint as needed
      setSellerId(response.data._id); // Assuming the response has the ID under `_id`
    } catch (error) {
      console.error('Error fetching seller ID:', error);
      setMessage('Failed to fetch seller ID, please check the username.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchSellerId(sellerUsername); // Fetch seller ID before submitting
    if (!sellerId) {
      setMessage('Failed to fetch seller ID, please check the username.');
      return; // Exit early if `sellerId` is not set
  }
    // Use sellerId when creating the product
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDetails);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('seller', sellerId); // Use the fetched seller ID
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/Products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        setProductName('');
        setProductDetails('');
        setPrice('');
        setQuantity('');
        setSellerUsername(''); // Reset username
        setImage(null);
        setImagePreview(null);
        setMessage('Product successfully created!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create product, please try again.' + error);
    }
    
  };

  return (
    <div>
      <div style={{ marginLeft: '70px' }}>
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
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Enter product name"
          required
          style={inputStyle}
        />

        <input
          value={productDetails}
          onChange={handleProductDetailsChange}
          placeholder="Enter product details"
          required
          style={inputStyle}
        />

        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price"
          required
          style={inputStyle}
        />

        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Enter available quantity"
          required
          style={inputStyle}
        />

        <input
          type="text"
          value={sellerUsername}
          onChange={handleSellerUsernameChange}
          placeholder="Enter seller username"
          required
          style={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={{ marginBottom: '10px' }}
        />

        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{ width: '100px', height: '100px', marginBottom: '10px' }}
            />
          </div>
        )}
        {message && <p>{message}</p>}

        <button type="submit">Add Product</button>
      </form>
    </div>
    </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '10px',
  width: '100%',
};
