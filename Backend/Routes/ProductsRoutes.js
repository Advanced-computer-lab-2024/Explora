const express = require("express");
const router = express.Router();
const {upload}= require('../middleware/upload');
const{
    createProduct,
    allProducts,
    productsByName,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct,
    addReview,
    viewQuantityAndSales,
    archiveProduct,
    archivedProducts,
    unarchivedProducts,
    deleteAllProducts,
    productsBySeller,
    addRating
} = require("../controllers/ProductController");

router.get('/', allProducts);    
router.get('/archiveProducts', archivedProducts);
router.get('/unarchivedProducts', unarchivedProducts);
router.get('/sortByRating', sortProducts)
router.get('/filterByPrice', filteredProducts);
router.get('/seller/:sellerId', productsBySeller);

router.get('/quantity&sales', viewQuantityAndSales);       
router.post('/upload', upload.single('image'), createProduct);
router.get('/availableProducts', availableProducts)
router.get('/:name', searchProducts);
router.put('/updateProduct/:id',updateProduct )
router.get('/productByName/:name', productsByName)
router.post('/addReview/:id', addReview); // Route for adding a review to a product  
router.put('/archiveProduct/:id', archiveProduct);
router.delete('/deleteAllProducts', deleteAllProducts);
router.post('/addRating/:id', addRating);

module.exports = router;
