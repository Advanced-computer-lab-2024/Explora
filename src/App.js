// src/App.js
import React, { useState } from 'react';
import MuseumForm from './components/MuseumForm';
import MuseumList from './components/MuseumList';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';

function App() {
    const [museums, setMuseums] = useState([]);
    const [products, setProducts] = useState([]);

    // Handle adding museums
    const handleAddMuseum = (newMuseum) => {
        setMuseums([...museums, newMuseum]);
    };

    // Handle adding products
    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    return (
        <div>
            <h1>Tourism Governor</h1>

            <h2>Manage Museums</h2>
            <MuseumForm onSubmit={handleAddMuseum} />
            <MuseumList museums={museums} />

            <h2>Available Products</h2>
            <ProductForm onSubmit={handleAddProduct} />
            <ProductCard products={products} />
        </div>
    );
}

export default App;
