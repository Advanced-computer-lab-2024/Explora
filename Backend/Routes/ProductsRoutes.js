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
    addProductReview,
    updateProductRating
} = require("../controllers/ProductController");

router.post('/upload', upload.single('image'), createProduct);
router.get('/', allProducts)
router.get('/availableProducts', availableProducts)
router.get('/:name', searchProducts);
router.get('/filterByPrice', filteredProducts);
router.get('/sortByRating', sortProducts)
router.put('/updateProduct/:id',updateProduct )
router.get('/productByName/:name', productsByName)
router.put('/addReview/:id', addProductReview);
router.put('/updateRating/:id', updateProductRating);






module.exports = router;

