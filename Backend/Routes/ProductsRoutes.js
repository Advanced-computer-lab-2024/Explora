const express = require("express");
const router = express.Router();
const {upload}= require('../middleware/upload');
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
    viewQuantityAndSales,
    archiveProduct
} = require("../controllers/ProductController");

router.get('/', allProducts);                            
router.get('/quantity&sales', viewQuantityAndSales);       
router.post('/upload', upload.single('image'), createProduct);
router.get('/', allProducts)
router.get('/availableProducts', availableProducts)
router.get('/:name', searchProducts);
router.get('/filterByPrice', filteredProducts);
router.get('/sortByRating', sortProducts)
router.put('/updateProduct/:id',updateProduct )
router.get('/productByName/:name', productsByName)
router.post('/addReview/:id', addReview); // Route for adding a review to a product



module.exports = router;

