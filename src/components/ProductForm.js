// src/components/ProductForm.js
import React, { useState } from 'react';

function ProductForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        seller: '',
        rating: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            image: '',
            description: '',
            price: '',
            seller: '',
            rating: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Product Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                placeholder="Image URL"
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={formData.description}
                placeholder="Product Description"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="seller"
                value={formData.seller}
                placeholder="Seller"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="rating"
                value={formData.rating}
                placeholder="Rating"
                min="0"
                max="5"
                onChange={handleChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default ProductForm;
