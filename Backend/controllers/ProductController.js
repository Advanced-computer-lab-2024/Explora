const Product = require("../models/Products");
const mongoose = require("mongoose");
const {upload } = require('../middleware/upload');

// get all products 
//https://localhost:4000/Products/
const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/${product.image}`,
        }));
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

// get archived products

const archivedProducts = async (req, res) => {
    try {
        const products = await Product.find({ archived: true });
        if (!products.length) {
            return res.status(404).json({ msg: 'No archived products found' });
        }
        const updatedProducts = products.map(product => {
            return {
                ...product._doc,
                image: `${req.protocol}://${req.get('host')}/${product.image}`
            };
        });
        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

// get unarchived products

const unarchivedProducts = async (req, res) => {
    try {
        const products = await Product.find({ archived: false });
        if (!products.length) {
            return res.status(404).json({ msg: 'No unarchived products found' });
        }

        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/${product.image}`
        }));

        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

// delete all products 

const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ msg: 'All products deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};




// get product by name
const productsByName = async (req, res) => {
    const { name } = req.params;
    try {
        const products = await Product.find({ name: new RegExp(name, 'i') });
        if (!products.length) {
            return res.status(404).json({ msg: 'No products found' });
        }

        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/${product.image}`
        }));

        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// filter product by price 

const filteredProducts = async (req, res) => {
    try {
        let { min, max } = req.query;

        // Convert to numbers and validate
        min = Number(min);
        max = Number(max);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ msg: 'Invalid price range' });
        }

        const products = await Product.find({
            price: { $gte: min, $lte: max }
        });

        if (!products.length) {
            return res.status(404).json({ msg: 'No products found' });
        }

        // Update product image URL
        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/${product.image}`
        }));

        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

 
// add a new product
const createProduct = async (req, res) => {
    const { name, price, description, seller, quantity } = req.body;
    const picturePath = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const image = req.file ? req.file.path : null; // Use req.file instead of req.files

        const newProduct = await Product.create({
            name,
            price,
            description: description,
            seller,
            image: image,
            quantity: quantity,
            name, price, description, seller, image: picturePath, quantity
        });
        res.status(201).json({
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            seller: newProduct.seller,
            image: newProduct.image,
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// update a product

const updateProduct = async (req,res) => {
    try{
    const { id } = req.params;
    const { name, price, description } = req.body;
    if (id) {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
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
    let sortOrder;

    if (order === 'high-to-low') {
        sortOrder = -1; // Descending order
    } else if (order === 'low-to-high') {
        sortOrder = 1;  // Ascending order
    } else {
        sortOrder = 1;  // Default to ascending order if no valid value
    }

    try {
        const allProducts = await Product.find();
        console.log('All Products:', allProducts);

        const sortedProducts = await Product.find().sort({ averageRating: sortOrder });

        if (sortedProducts.length === 0) {
            return res.status(404).json({ msg: 'No products found for sorting by rating.' });
        }

        res.status(200).json(sortedProducts);
    } catch (error) {
        console.error('Error sorting products by rating:', error);
        res.status(500).json({ message: 'Server error while sorting by rating', error: error.message });
    }
};

// Add a review (text-only)


// Existing controller functions...

// Add a rating
const addRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    try {
        // Find the product by its ID
        const product = await Product.findById(id);
        
        // Check if the product exists
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Validate the rating value
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ msg: 'Rating must be a number between 1 and 5' });
        }

        // Add the new rating with a default comment if none provided
        product.reviews.push({ rating, comment: 'No comment provided' });
        
        // Calculate and update the average rating
        product.averageRating = product.calculateAverageRating();
        
        // Save the updated product
        await product.save();

        // Respond with success message and updated product
        res.status(200).json({ msg: 'Rating added successfully', product });
    } catch (error) {
        console.error('Error in addRating:', error);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
};

// Add a review
const addReview = async (req, res) => {
    const { id } = req.params;
    const { user, comment } = req.body; // Only user and comment are expected

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Push the new review with user and comment
        product.reviews.push({ user, comment });

        // Save the updated product
        await product.save();

        // Send the response
        res.status(200).json({ msg: 'Review added successfully', product });
    } catch (err) {
        console.error('Error in addReview:', err);
        res.status(500).json({ msg: 'Internal Server Error', error: err.message });
    }
};

// view qnatity and sales 

const viewQuantityAndSales = async (req, res) => {
        try {
            const products = await Product.find().select('name quantity sales');
            if (!products || products.length === 0) {
                return res.status(404).json({ msg: 'No products found' });
            }
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    };

// archive and unarchive products 

const archiveProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid product ID' });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        const newArchivedStatus = !product.archived;
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { archived: newArchivedStatus }, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found after update' });
        }
        console.log("Updated Product:", updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error during update:", err);  // Log full error stack for debugging
        res.status(400).json({ msg: err.message });
    }
};
// get products of a specific seller
const productsBySeller = async (req, res) => {
    const { sellerId } = req.params;  // assuming seller's ID is passed in the route parameter
    try {
        const products = await Product.find({ seller: sellerId });
        
        if (!products.length) {
            return res.status(404).json({ msg: 'No products found for this seller' });
        }

        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/${product.image}` // Include the full URL for the image
        }));

        res.status(200).json(updatedProducts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



module.exports = {
    createProduct,
    allProducts, 
    productsByName,
    productsBySeller,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct,
    addReview,
    addRating,
    addReview,
    viewQuantityAndSales,
    archiveProduct,
    archivedProducts,
    unarchivedProducts,
    deleteAllProducts
};