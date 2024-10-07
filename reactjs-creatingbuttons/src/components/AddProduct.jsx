import React, { useState } from 'react';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDetailsChange = (event) => {
    setProductDetails(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Product Name:', productName);
    console.log('Product Details:', productDetails);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
    // Reset the form fields
    setProductName('');
    setProductDetails('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Enter product name"
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />

        <input
          id="productDetails"
          value={productDetails}
          onChange={handleProductDetailsChange}
          placeholder="Enter product details"
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />

        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price"
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />

        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Enter available quantity"
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%',
          }}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
