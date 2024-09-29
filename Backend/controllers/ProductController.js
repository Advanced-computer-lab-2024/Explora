const Product = require("../models/Products");
const mongoose = require("mongoose");

// get all products 
const allProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}

// sort products by rating 



// get product by name
const productsByName = async (req, res) => {
    const  {name}  = req.params;
    const products = await Product.find({ name: new RegExp(name, 'i') });
    if(!products){
        return res.status(404).json({msg: 'No products found'});
    }
    res.status(200).json(products);

}

// get product by price 

 
// add a new product
const createProduct = async (req, res) => {
    const {image, name, price, description,seller} = req.body;
    try {
        const newProduct = await Product.create({image, name, price, description, seller});
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
    
}


// update a product



module.exports = {
    createProduct,
    allProducts, 
    productsByName
};