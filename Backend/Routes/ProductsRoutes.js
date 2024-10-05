const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const{
    createProduct,
    allProducts,
    productsByName ,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct
} = require("../controllers/ProductController");

router.post('/upload', upload.single('file'), createProduct);
router.get('/products', allProducts)
router.get('/availableProducts', availableProducts)
router.get('/search/:name', searchProducts);
router.get('/filterByPrice', filteredProducts)
router.get('/sortByRating', sortProducts)
router.put('/updateProduct/:id',updateProduct )






module.exports = router;

