const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createProduct,
    allProducts,
    productsByName,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct,
    addReview,
    addRating
} = require("../controllers/ProductController");

router.post('/upload', upload.single('image'), createProduct);
router.get('/', allProducts);
router.get('/availableProducts', availableProducts);
router.get('/productByName/:name', productsByName);
router.get('/filterByPrice', filteredProducts);
router.get('/sortByRating', sortProducts);
router.put('/updateProduct/:id', updateProduct);
router.post('/addReview/:id', addReview);
router.post('/addRating/:id', addRating);

module.exports = router;
