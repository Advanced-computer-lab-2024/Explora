const Product = require("../models/Products");
const mongoose = require("mongoose");
const {upload } = require('../middleware/upload');

// get all products 
const allProducts = async (req, res) => {
    const products = await Product.find()

    try {
        const updatedProducts = products.map(product => {
            return {
                ...product._doc, 
                image: `${req.protocol}://${req.get('host')}/${product.image}` // Include the full URL for the image
            };
        });
        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



// get all available products

const availableProducts = async (req, res) => {
    try {
        const products = await Product.find({quantity: { $gt: 0 } })
        if (!products.length) {
            return res.status(404).json({ msg: 'No available products found' });
        }
        const updatedProducts = products.map(product => {
            return {
                ...product._doc, 
                image: `${req.protocol}://${req.get('host')}/${product.image}` // Include the full URL for the image
            };
        });
        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



// get product by name
const productsByName = async (req, res) => {
    const  {name}  = req.params;
    const products = await Product.find({ name: new RegExp(name, 'i') });
    if(!products){
        return res.status(404).json({msg: 'No products found'});
    }
    res.status(200).json(products);

}

// filter product by price 

const filteredProducts = async (req, res) => {
    try {
        
        const {min, max } = req.query;
        const products = await Product.find({ price: { $gte: min, $lte: max } });
        if(!products){
            return res.status(404).json({msg: 'No products found'});
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }

}
 
// add a new product
const createProduct = async (req, res) => {
    const {name, price, description,seller, quantity} = req.body;

    try {
        const picturePath = req.file ? `uploads/${req.file.filename}` : null;

        const newProduct = await Product.create({
            name,
            price,
            description,
            seller,
            image: picturePath,
            quantity: quantity
        });
        res.status(201).json({
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            seller: newProduct.seller,
            picture: newProduct.image // Use 'image' field to return the image path
        });
        } catch (err) {
        res.status(400).json({msg: err.message}); 
    }
    
}


// update a product

const updateProduct = async (req,res) => {
    try{
    const { id } = req.params;
    const { name, price, description, seller, quantity } = req.body;
    if (id) {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, seller, quantity }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    
    }
    else {
        return res.status(404).json({ msg: 'Product not found' });
    }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
    
}

// Search for products with the product name
const searchProducts = async (req, res) => {
    const { name } = req.params;
    if(!name){
        return res.status(400).json({ msg: 'Please provide a product name' });
    }
    try {
        const products = await Product.find({ name: new RegExp(name, 'i') });
        if (products.length === 0) {
            return res.status(404).json({ msg: 'No products found' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// sort product by rating 
const sortProducts = async (req, res) => {
    const { order } = req.query; 
    let sortOrder = order === 'high' ? -1 : 1; 
  
    try {
      const sortedproducts = await Product.find().sort({ rating: sortOrder });
  
      if (sortedproducts.length === 0) {
        return res.status(404).json({ message: 'No products found for sorting by rating.' });
      }
  
      res.status(200).json(sortedproducts);
    } catch (error) {
      console.error('Error sorting products by rating:', error);
      res.status(500).json({ message: 'Server error while sorting by rating', error: error.message });
    }
    
};
const addReview = async (req, res) => {
    const { id } = req.params;
    const { user, comment, rating } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.reviews.push({ user, comment, rating });
        
        // Recalculate and update the average rating
        product.averageRating = product.calculateAverageRating();
        await product.save();

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


module.exports = {
    createProduct,
    allProducts, 
    productsByName,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct,
    addReview
};