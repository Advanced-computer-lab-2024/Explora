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
    updateProduct,
    addReview,
    changeCurrency
} = require("../controllers/ProductController");

router.post('/upload', upload.single('file'), createProduct);
router.get('/products', allProducts)
router.get('/availableProducts', availableProducts)
router.get('/search/:name', searchProducts);
router.get('/filterByPrice', filteredProducts)
router.get('/sortByRating', sortProducts)
router.put('/updateProduct/:id',updateProduct )
router.get('/productByName/:name', productsByName)
router.put('/addReview/:id', addReview); // Route for adding a review to a product
router.put('/currency/:currency/:id', changeCurrency); // Route for adding a review to a product






module.exports = router;

